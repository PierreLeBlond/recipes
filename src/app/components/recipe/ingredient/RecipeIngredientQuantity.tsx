"use client";

import { Food, Ingredient, Units } from "@/prisma/generated/client";
import { getFormatedQuantity } from "@/src/lib/quantity/getFormatedQuantity";
import { Menu, MenuHandler, MenuItem, MenuList } from "@/src/lib/material";
import { ChevronDown } from "lucide-react";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";
import { unknown } from "zod";

type RecipeIngredientQuantityProps = {
  ingredient: Ingredient & { food: Food };
  localData: {
    plateRatio: number;
    unit: Units;
  };
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
  props: { ingredient, localData },
  onUnitChange,
}: {
  props: RecipeIngredientQuantityProps;
  onUnitChange: (unit: Units) => void;
}) {
  const alternativeUnits = alternativeUnitsMap[ingredient.food.unit]({
    density: ingredient.food.density,
    massPerPiece: ingredient.food.massPerPiece,
  });

  const hasAlternatives = alternativeUnits.length !== 0;

  if (!hasAlternatives) {
    return (
      <div className="flex gap-4">
        <span className="font-bold">
          {getFormatedQuantity(
            localData.unit,
            getQuantityFromPlateAndUnit({
              ingredient: ingredient,
              localData: localData,
            }),
          )}
        </span>
        <ChevronDown className="text-gray-400"></ChevronDown>
      </div>
    );
  }

  if (ingredient.food.unit !== localData.unit) {
    alternativeUnits.splice(
      alternativeUnits.indexOf(localData.unit),
      1,
      ingredient.food.unit,
    );
  }

  return (
    <>
      <Menu
        placement="bottom-end"
        offset={{ mainAxis: 8, crossAxis: 9 }}
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
          <div className="flex cursor-pointer gap-4">
            <span className="font-bold">
              {getFormatedQuantity(
                localData.unit,
                getQuantityFromPlateAndUnit({
                  ingredient: ingredient,
                  localData: localData,
                }),
              )}
            </span>
            <ChevronDown
              className="text-orange-600"
              strokeWidth={4}
            ></ChevronDown>
          </div>
        </MenuHandler>
        <MenuList className="relative rounded-b rounded-t-none border-b border-l border-r border-t-0 border-gray-900 p-2">
          {alternativeUnits.map((alternativeUnit, index) => (
            <MenuItem
              key={index}
              className="flex justify-end gap-4 p-0 text-center text-base"
              onClick={() => onUnitChange(alternativeUnit)}
            >
              <span className="font-bold">
                {getFormatedQuantity(
                  alternativeUnit,
                  getQuantityFromPlateAndUnit({
                    ingredient: ingredient,
                    localData: {
                      plateRatio: localData.plateRatio,
                      unit: alternativeUnit,
                    },
                  }),
                )}
              </span>
              <div className="size-6"></div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
