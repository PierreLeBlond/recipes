"use client";

import { Food, Ingredient, Units } from "@/prisma/generated/client";
import { RecipeIngredientQuantity } from "./RecipeIngredientQuantity";
import { Check } from "lucide-react";
import { useState } from "react";

type RecipeIngredientProps = {
  ingredient: Ingredient & { food: Food };
  localData: {
    plateRatio: number;
    unit: Units;
  };
};

export function RecipeIngredient({
  props: { ingredient, localData },
  onUnitChange,
}: {
  props: RecipeIngredientProps;
  onUnitChange: (unit: Units) => void;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="flex rounded-t-md rounded-bl-md border border-gray-900 shadow-fly"
      onClick={() => setChecked(!checked)}
    >
      <div className="group flex items-center border-r border-gray-900 px-4 py-2 hover:cursor-pointer">
        <Check
          size={16}
          strokeWidth={5}
          className={`${checked ? "text-green-500" : "text-gray-500"} group-hover:cursor-pointer group-hover:text-green-500`}
        ></Check>
      </div>
      <div className="flex w-full items-center justify-between p-2">
        {ingredient.food.name}
        <RecipeIngredientQuantity
          onUnitChange={onUnitChange}
          props={{ ingredient, localData }}
        ></RecipeIngredientQuantity>
      </div>
    </div>
  );
}
