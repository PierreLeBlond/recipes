"use client";

import { RecipePlateCount } from "@/src/app/components/recipe/plateCount/RecipePlateCount";
import {
  Food,
  Ingredient,
  Recipe,
  Step,
} from "@/prisma/generated/client/index.js";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { api } from "@/src/trpc/react";
import { SessionProvider } from "next-auth/react";
import { useToast } from "@/src/app/components/ui/use-toast";
import { RecipeImage } from "./image/RecipeImage";
import { RecipeName } from "./name/RecipeName";
import { RecipeSteps } from "./steps/RecipeSteps";
import { RecipeIngredients } from "./ingredients/RecipeIngredients";
import { EditSwitch } from "./EditSwitch";
import { RecipeSubmitButton } from "./RecipeSubmitButton";
import { RecipeDelete } from "./RecipeDelete";

type RecipeProps = {
  recipe: Recipe & {
    ingredients: (Ingredient & { food: Food })[];
    steps: Step[];
  };
};

export function RecipeForm({ props: { recipe } }: { props: RecipeProps }) {
  const methods = useForm<FormInputs>({
    defaultValues: recipe,
  });

  const { toast } = useToast();
  const updateMutation = api.recipe.update.useMutation({
    onSuccess: (data) => {
      toast({
        title: "C'est tout bon !",
        description: "La recette a bien été modifiée.",
      });
      methods.reset(data);
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    updateMutation.mutate({
      id: recipe.id,
      name: data.name,
      plateCount: data.plateCount,
      image: data.image,
      ingredients: data.ingredients.map((ingredient) => ({
        ...ingredient,
        foodName: ingredient.food.name,
      })),
      steps: data.steps,
    });
  };

  return (
    <SessionProvider basePath={`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`}>
      <FormProvider {...methods}>
        <EditSwitch />
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid gap-y-8 pt-16 lg:grid-cols-3 lg:gap-x-4"
        >
          <div className="xs:aspect-square xs:w-auto h-[310px] w-full">
            <RecipeImage />
          </div>

          <div className="xs:px-0 order-first px-4 lg:order-none lg:col-span-2">
            <RecipeName />
          </div>

          <div className="lg:col-span-3">
            <RecipePlateCount />
          </div>

          <div className="overflow-hidden lg:col-span-3">
            <RecipeIngredients />
          </div>

          <div className="xs:px-0 px-4 lg:col-span-3">
            <RecipeSteps />
          </div>

          <div className="flex justify-center lg:col-span-3">
            <RecipeSubmitButton />
          </div>
        </form>
        <RecipeDelete props={{ id: recipe.id, name: recipe.name }} />
      </FormProvider>
    </SessionProvider>
  );
}
