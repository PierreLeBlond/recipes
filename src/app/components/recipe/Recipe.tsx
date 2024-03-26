"use client";

import { RecipePlateCount } from "@/src/app/components/recipe/plateCount/RecipePlateCount";
import { Food, Ingredient, Recipe, Step } from "@/prisma/generated/client";
import { RecipeImage } from "./image/RecipeImage";
import { RecipeName } from "./name/RecipeName";
import { RecipeSteps } from "./steps/RecipeSteps";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { api } from "@/src/trpc/react";
import { RecipeIngredients } from "./ingredients/RecipeIngredients";
import { SessionProvider } from "next-auth/react";
import { EditSwitch } from "./EditSwitch";
import { RecipeSubmitButton } from "./RecipeSubmitButton";

type RecipeProps = {
  recipe: Recipe & {
    ingredients: (Ingredient & { food: Food })[];
    steps: Step[];
  };
};

export function Recipe({ props: { recipe } }: { props: RecipeProps }) {
  const updateMutation = api.recipe.update.useMutation();

  const methods = useForm<FormInputs>({
    defaultValues: recipe,
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    updateMutation.mutate({ id: recipe.id, ...data });
  };

  return (
    <SessionProvider>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid gap-8 lg:grid-cols-3"
        >
          <div className="lg:col-span-3">
            <EditSwitch></EditSwitch>
          </div>
          <div className="aspect-square h-72">
            <RecipeImage></RecipeImage>
          </div>
          <div className="lg:col-span-2">
            <RecipeName></RecipeName>
          </div>

          <div className="lg:col-span-3">
            <RecipePlateCount></RecipePlateCount>
          </div>

          <div className="lg:col-span-3">
            <RecipeIngredients></RecipeIngredients>
          </div>

          <div className="lg:col-span-3">
            <RecipeSteps></RecipeSteps>
          </div>

          <div className="lg:col-start-3">
            <RecipeSubmitButton></RecipeSubmitButton>
          </div>
        </form>
      </FormProvider>
    </SessionProvider>
  );
}
