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
    <div className="border-secondary flex h-12 rounded-t-md rounded-bl-md border">
      <button
        aria-label="Cocher l'ingrédient"
        type="button"
        className="border-secondary/50 flex items-center border-r px-4 py-2"
        onClick={() => setChecked(!checked)}
      >
        <Check
          size={16}
          strokeWidth={5}
          className={`${checked ? "text-success" : "text-secondary/20"}`}
        />
      </button>
      <div className="flex w-full items-center justify-between p-2">
        {ingredient.food.name}
        <RecipeIngredientQuantity props={{ ingredient }} />
      </div>
    </div>
  );
}
