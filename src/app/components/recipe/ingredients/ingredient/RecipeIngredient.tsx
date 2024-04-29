"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { RecipeIngredientQuantity } from "./RecipeIngredientQuantity";

type RecipeIngredientProps = {
  ingredient: Ingredient;
};

export function RecipeIngredient({
  props: { ingredient },
}: {
  props: RecipeIngredientProps;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex h-12 rounded-t-md rounded-bl-md border border-gray-500 bg-white">
      <button
        aria-label="Cocher l'ingrédient"
        type="button"
        className="flex items-center border-r border-gray-500/20 px-4 py-2"
        onClick={() => setChecked(!checked)}
      >
        <Check
          size={16}
          strokeWidth={5}
          className={`${checked ? "text-green-500" : "text-gray-500"}`}
        />
      </button>
      <div className="flex w-full flex-wrap items-center justify-between p-2">
        {ingredient.food.name}
        <RecipeIngredientQuantity props={{ ingredient }} />
      </div>
    </div>
  );
}
