"use client";

import { RecipeStep } from "@/src/app/components/recipe/step/RecipeStep";
import { RecipePlateCount } from "@/src/app/components/recipe/RecipePlateCount";
import {
  Food,
  Ingredient,
  Recipe,
  Step,
  Units,
} from "@/prisma/generated/client";
import { useState } from "react";
import { RecipeIngredient } from "./ingredient/RecipeIngredient";
import { UtensilsCrossed } from "lucide-react";
import { Title } from "../utils/Title";

type RecipeProps = {
  recipe: Recipe & {
    ingredients: (Ingredient & { food: Food })[];
    steps: Step[];
  };
};

export function Recipe({ props: { recipe } }: { props: RecipeProps }) {
  const [plateCount, setPlateCount] = useState(recipe.plateCount);
  const [units, setUnits] = useState(
    Object.fromEntries(
      recipe.ingredients.map((ingredient) => [
        ingredient.id,
        ingredient.food.unit,
      ]),
    ),
  );

  const handleUnitChange = (unit: Units, ingredient: Ingredient) => {
    setUnits({ ...units, [ingredient.id]: unit });
  };

  const handlePlateCountChange = (count: number) => {
    setPlateCount(plateCount + count);
  };

  const recipeIngredients = recipe.ingredients.map((ingredient) => {
    const unit = units[ingredient.id];

    if (!unit) {
      throw new Error("Unit not found");
    }

    return {
      ingredient,
      localData: {
        plateRatio: plateCount / recipe.plateCount,
        unit,
      },
    };
  });

  return (
    <>
      <Title props={{ title: recipe.name }}></Title>
      <div className="pb-4 lg:pb-16">
        <RecipePlateCount
          props={{
            plateCount,
            handlePlateCountChange,
          }}
        ></RecipePlateCount>
      </div>
      <div className="grid grid-cols-1 gap-4 gap-y-16 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold tracking-tighter text-gray-800">
            INGRÉDIENTS
          </h2>
          <ul className="flex list-inside flex-col gap-4">
            {recipeIngredients.map((recipeIngredient) => (
              <li key={recipeIngredient.ingredient.id}>
                <RecipeIngredient
                  onUnitChange={(unit) =>
                    handleUnitChange(unit, recipeIngredient.ingredient)
                  }
                  props={{ ...recipeIngredient }}
                ></RecipeIngredient>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 md:col-span-2">
          <h2 className="text-4xl font-bold tracking-tighter text-gray-800">
            ÉTAPES
          </h2>
          <ol className="flex list-inside flex-col">
            {recipe.steps.map((step, index) => (
              <li
                className={`${index < recipe.steps.length - 1 && "border-b"} border-gray-700 p-4`}
                key={step.id}
              >
                <RecipeStep props={{ step, recipeIngredients }}></RecipeStep>
              </li>
            ))}
          </ol>
          <div className="flex w-full justify-center">
            <UtensilsCrossed></UtensilsCrossed>
          </div>
        </div>
      </div>
    </>
  );
}
