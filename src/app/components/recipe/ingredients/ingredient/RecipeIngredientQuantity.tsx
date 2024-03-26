"use client";

import { Recipe, Units } from "@/prisma/generated/client";
import { getFormatedQuantity } from "@/src/lib/quantity/getFormatedQuantity";
import { Menu, MenuHandler, MenuItem, MenuList } from "@/src/lib/material";
import { ArrowDownUp, ChevronDown } from "lucide-react";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";
import { IngredientInput } from "@/src/lib/types/IngredientInput";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { QueryState } from "@/src/lib/queryState/QueryState";
import Link from "next/link";
import { serializeQueryState } from "@/src/lib/queryState/serializeQueryState";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { useWatch } from "react-hook-form";
import { QueryParamsLink } from "../../../utils/QueryParamsLink";
import { FormInputs } from "@/src/lib/types/FormInputs";

type RecipeIngredientQuantityProps = {
  ingredient: IngredientInput;
};

const alternativeUnitsMap: {
  [Unit in Units]: (data: {
    density: number | null;
    massPerPiece: number | null;
  }) => Units[];
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
  [Units.TEASPOON]: ({ density }) => {
    return [Units.LITER, ...(density !== null ? [Units.GRAM] : [])];
  },
  [Units.TABLESPOON]: ({ density }) => {
    return [Units.LITER, ...(density !== null ? [Units.GRAM] : [])];
  },
  [Units.PINCH]: ({ density }) => {
    return [Units.LITER, ...(density !== null ? [Units.GRAM] : [])];
  },
  [Units.DROP]: ({ density }) => {
    return [Units.LITER, ...(density !== null ? [Units.GRAM] : [])];
  },
};

export function RecipeIngredientQuantity({
  props: { ingredient },
}: {
  props: RecipeIngredientQuantityProps;
}) {
  const [open, setOpen] = useState(false);

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
      <div className="flex min-w-40 justify-end gap-4 justify-self-end">
        <span className="font-bold">
          {getFormatedQuantity(
            unit,
            getQuantityFromPlateAndUnit({
              ingredient,
              plateRatio,
              unit,
            }),
          )}
        </span>
        <ChevronDown className="text-gray-400"></ChevronDown>
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
    <>
      <Menu
        open={open}
        handler={setOpen}
        placement="bottom-end"
        offset={{ mainAxis: 11, crossAxis: 9 }}
        animate={{
          mount: {
            transform: "scaleY(1)",
            transition: { duration: 0.1, times: [0.4, 0, 0.2, 1] },
          },
          unmount: {
            opacity: 1,
            transform: "scaleY(0)",
            transition: { duration: 0.1, times: [0.4, 0, 0.2, 1] },
          },
        }}
      >
        <MenuHandler>
          <div className="flex min-w-40 cursor-pointer justify-end gap-4 justify-self-end">
            <span className="font-bold">
              {getFormatedQuantity(
                unit,
                getQuantityFromPlateAndUnit({
                  ingredient: ingredient,
                  plateRatio,
                  unit,
                }),
              )}
            </span>
            <ChevronDown
              className={cn("text-gray-900 transition-transform", {
                "rotate-180": open,
              })}
              strokeWidth={4}
            ></ChevronDown>
          </div>
        </MenuHandler>
        <MenuList className="relative rounded-b rounded-t-none border-b border-l border-r border-t-0 border-gray-500 p-2">
          {alternativeUnits.map((alternativeUnit, index) => (
            <MenuItem key={index} className="p-0">
              <QueryParamsLink
                className="group flex justify-end gap-4 text-center text-base"
                props={{
                  partialQueryState: {
                    units: {
                      ...queryState.units,
                      [ingredient.food.name]: alternativeUnit,
                    },
                  },
                }}
              >
                <span className="font-bold">
                  {getFormatedQuantity(
                    alternativeUnit,
                    getQuantityFromPlateAndUnit({
                      ingredient: ingredient,
                      plateRatio,
                      unit: alternativeUnit,
                    }),
                  )}
                </span>
                <div className="invisible flex size-6 items-center justify-center group-hover:visible">
                  <ArrowDownUp strokeWidth={4} size={18}></ArrowDownUp>
                </div>
              </QueryParamsLink>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
