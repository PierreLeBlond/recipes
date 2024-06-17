"use client";

import { getFormatedQuantity } from "@/src/lib/quantity/getFormatedQuantity";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { useWatch } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { Unit, Units } from "@/src/lib/types/Units";
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
  const queryState = useQueryState();
  const plateCount = useWatch<FormInputs, "plateCount">({ name: "plateCount" });

  const alternativeUnits = alternativeUnitsMap[ingredient.food.unit]({
    density: ingredient.food.density,
    massPerPiece: ingredient.food.massPerPiece,
  });

  const hasAlternatives = alternativeUnits.length !== 0;

  const unit = queryState.units[ingredient.food.name] || ingredient.food.unit;

  const plateRatio = queryState.plateCount / plateCount;

  if (!hasAlternatives) {
    return (
      <div className="flex justify-end gap-4 justify-self-end">
        <span className="text-nowrap font-bold">
          {getFormatedQuantity(
            unit,
            getQuantityFromPlateAndUnit({
              ingredient: {
                ...ingredient,
                unit,
              },
              plateRatio,
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
              }),
            )}
          </span>
          <ChevronDown strokeWidth={3} className="text-secondary" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="border-secondary shadow-lg shadow-secondary/80"
      >
        {alternativeUnits.map((alternativeUnit) => (
          <div key={alternativeUnit}>
            <QueryParamsLink
              className="group flex w-full justify-between gap-4 text-center text-base"
              props={{
                partialQueryState: {
                  units: {
                    ...queryState.units,
                    [ingredient.food.name]: alternativeUnit,
                  },
                },
              }}
            >
              <span className="text-nowrap font-bold">
                {getFormatedQuantity(
                  alternativeUnit,
                  getQuantityFromPlateAndUnit({
                    ingredient: {
                      ...ingredient,
                      unit: alternativeUnit,
                    },
                    plateRatio,
                  }),
                )}
              </span>
              <div className="invisible flex size-6 items-center justify-center text-secondary group-hover:visible">
                <ArrowDownUp strokeWidth={3} size={18} />
              </div>
            </QueryParamsLink>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
