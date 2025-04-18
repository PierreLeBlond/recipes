"use client";

import { getFormatedQuantity } from "@/src/lib/quantity/getFormatedQuantity";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";
import { useWatch } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { Unit, Units } from "@/src/lib/types/Units";
import { useUnitsQuery } from "@/src/lib/hooks/useUnitsQuery";
import { usePlateCountQuery } from "@/src/lib/hooks/usePlateCountQuery";
import { QueryParamsLink } from "../../../utils/QueryParamsLink";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";

type RecipeIngredientQuantityProps = {
  ingredient: Ingredient;
};

const alternativeUnitsMap: {
  [unit in Unit]: (data: {
    density: number | null;
    massPerPiece: number | null;
  }) => Unit[];
} = {
  [Units.GRAM]: ({ density }) => {
    if (density === null) {
      return [];
    }

    return [Units.LITER];
  },
  [Units.LITER]: ({ density }) => {
    if (density === null) {
      return [];
    }

    return [Units.GRAM];
  },
  [Units.PIECE]: ({ massPerPiece }) => {
    if (!massPerPiece) {
      return [];
    }

    return [Units.GRAM];
  },
  [Units.TEASPOON]: ({ density }) => [
    Units.LITER,
    ...(density !== null ? [Units.GRAM] : []),
  ],
  [Units.TABLESPOON]: ({ density }) => [
    Units.LITER,
    ...(density !== null ? [Units.GRAM] : []),
  ],
  [Units.PINCH]: ({ density }) => [
    Units.LITER,
    ...(density !== null ? [Units.GRAM] : []),
  ],
  [Units.DROP]: ({ density }) => [
    Units.LITER,
    ...(density !== null ? [Units.GRAM] : []),
  ],
};

export function RecipeIngredientQuantity({
  props: { ingredient },
}: {
  props: RecipeIngredientQuantityProps;
}) {
  const unitsQuery = useUnitsQuery();
  const plateCountQuery = usePlateCountQuery();
  const plateCount = useWatch<FormInputs, "plateCount">({ name: "plateCount" });

  const alternativeUnits = alternativeUnitsMap[ingredient.food.unit]({
    density: ingredient.food.density,
    massPerPiece: ingredient.food.massPerPiece,
  });

  const hasAlternatives = alternativeUnits.length !== 0;

  const unit = unitsQuery[ingredient.food.name] || ingredient.food.unit;

  const plateRatio = plateCountQuery / plateCount;

  if (!hasAlternatives) {
    return (
      <div className="flex justify-end gap-4 justify-self-end">
        <span className="font-bold text-nowrap">
          {getFormatedQuantity(
            unit,
            getQuantityFromPlateAndUnit({
              ingredient: {
                ...ingredient,
                unit,
              },
              plateRatio,
              quantityPercentage: 100,
            }),
          )}
        </span>
        <ChevronDown className="text-secondary/20" />
      </div>
    );
  }

  if (ingredient.food.unit !== unit) {
    alternativeUnits.splice(
      alternativeUnits.indexOf(unit),
      1,
      ingredient.food.unit,
    );
  }

  return (
    <Popover modal={false}>
      <PopoverTrigger>
        <div className="flex cursor-pointer justify-end gap-4 justify-self-end">
          <span className="font-bold">
            {getFormatedQuantity(
              unit,
              getQuantityFromPlateAndUnit({
                ingredient,
                plateRatio,
                quantityPercentage: 100,
              }),
            )}
          </span>
          <ChevronDown strokeWidth={3} className="text-secondary" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="border-secondary shadow-secondary/80 shadow-lg"
      >
        {alternativeUnits.map((alternativeUnit) => (
          <div key={alternativeUnit}>
            <QueryParamsLink
              className="group flex w-full justify-between gap-4 text-center text-base"
              props={{
                name: `${ingredient.food.name}Unit`,
                value: alternativeUnit,
              }}
            >
              <span className="font-bold text-nowrap">
                {getFormatedQuantity(
                  alternativeUnit,
                  getQuantityFromPlateAndUnit({
                    ingredient: {
                      ...ingredient,
                      unit: alternativeUnit,
                    },
                    plateRatio,
                    quantityPercentage: 100,
                  }),
                )}
              </span>
              <div className="text-secondary invisible flex size-6 items-center justify-center group-hover:visible">
                <ArrowDownUp strokeWidth={3} size={18} />
              </div>
            </QueryParamsLink>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
