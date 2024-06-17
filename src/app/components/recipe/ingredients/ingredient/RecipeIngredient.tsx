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
    <div className="flex h-12 max-w-96 rounded-t-md rounded-bl-md border border-secondary">
      <button
        aria-label="Cocher l'ingrédient"
        type="button"
        className="flex items-center border-r border-secondary/50 px-4 py-2"
        onClick={() => setChecked(!checked)}
      >
        <Check
          size={16}
          strokeWidth={5}
          className={`${checked ? "text-success" : "text-secondary/20"}`}
        />
      </button>
      <div className="flex w-full items-center justify-between gap-2 overflow-hidden p-2">
        <div className="truncate">{ingredient.food.name}</div>
        <RecipeIngredientQuantity props={{ ingredient }} />
      </div>
    </div>
  );
}
