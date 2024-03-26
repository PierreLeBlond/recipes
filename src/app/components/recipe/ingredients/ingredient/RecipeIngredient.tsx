"use client";

import { Recipe, Units } from "@/prisma/generated/client";
import { RecipeIngredientQuantity } from "./RecipeIngredientQuantity";
import { Check } from "lucide-react";
import { useState } from "react";
import { IngredientInput } from "@/src/lib/types/IngredientInput";
import { QueryState } from "@/src/lib/queryState/QueryState";

type RecipeIngredientProps = {
  ingredient: IngredientInput;
};

export function RecipeIngredient({
  props: { ingredient },
}: {
  props: RecipeIngredientProps;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex h-12 rounded-t-md rounded-bl-md border border-gray-500 bg-white">
      <div
        className="flex items-center border-r border-gray-500/20 px-4 py-2 hover:cursor-pointer"
        onClick={() => setChecked(!checked)}
      >
        <Check
          size={16}
          strokeWidth={5}
          className={`${checked ? "text-green-500" : "text-gray-500"}`}
        ></Check>
      </div>
      <div className="flex w-full flex-wrap items-center justify-between p-2">
        {ingredient.food.name}
        <RecipeIngredientQuantity
          props={{ ingredient }}
        ></RecipeIngredientQuantity>
      </div>
    </div>
  );
}
