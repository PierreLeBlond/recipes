"use client";

import { Quantity } from "@/src/app/components/ingredient/Quantity";
import { StepView } from "@/src/app/components/recipe/StepView";
import { PlateCount } from "@/src/app/components/recipe/PlateCount";
import { Food, Ingredient, Recipe, Step } from "@/prisma/generated/client";
import { useEffect, useState } from "react";

type RecipeProps = {
  recipe: Recipe & {
    ingredients: (Ingredient & { food: Food })[];
    steps: Step[];
  };
};

export function Recipe({ props }: { props: RecipeProps }) {
  const [plateCount, setPlateCount] = useState(props.recipe.plateCount);

  const ingredients = props.recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: (ingredient.quantity * plateCount) / props.recipe.plateCount,
  }));

  return (
    <>
      <div className="py-16">
        <PlateCount
          props={{
            plateCount,
            setPlateCount,
          }}
        ></PlateCount>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold tracking-tighter">INGRÉDIENTS</h2>
          <ul className="flex list-inside flex-col gap-4">
            {ingredients.map((ingredient) => (
              <li
                className="shadow-fly flex justify-between rounded-md p-2"
                key={ingredient.id}
              >
                <span className="">{ingredient.food.name}</span>
                <Quantity
                  props={{
                    quantity: Number(ingredient.quantity),
                    unit: ingredient.food.unit,
                    density: ingredient.food.density,
                    massPerPiece: ingredient.food.massPerPiece,
                  }}
                ></Quantity>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 md:col-span-2">
          <h2 className="text-4xl font-bold tracking-tighter">ÉTAPES</h2>
          <ol className="flex list-inside flex-col gap-4">
            {props.recipe.steps.map((step) => (
              <li className="shadow-fly rounded-md p-4" key={step.id}>
                <StepView props={{ step, ingredients }}></StepView>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
