"use client";

import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Button, Input } from "@/src/lib/material";
import { api } from "@/src/trpc/react";
import { RecipePlateCount } from "@/src/app/components/recipe/RecipePlateCount";
import { Title } from "@/src/app/components/utils/Title";

import { Food, Ingredient, Recipe, Step } from "@/prisma/generated/client";
import { RecipeIngredientsEdit } from "./RecipeIngredientsEdit";
import { FormInputs } from "./FormInputs";
import { RecipeStepsEdit } from "./RecipeStepsEdit";
import { ImageEdit } from "./ImageEdit";
import { NameEdit } from "./NameEdit";
import { PlateCountEdit } from "./PlateCountEdit";

type RecipeEditProps = {
  recipe:
    | (Recipe & {
        ingredients: (Ingredient & { food: Food })[];
        steps: Step[];
      })
    | null;
};

export const RecipeEdit = ({
  props: { recipe },
}: {
  props: RecipeEditProps;
}) => {
  const createMutation = api.recipe.create.useMutation();
  const updateMutation = api.recipe.update.useMutation();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isDirty, errors },
  } = useForm<FormInputs>({
    defaultValues: recipe
      ? recipe
      : {
          name: "",
          image: null,
          plateCount: 8,
          ingredients: [],
        },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (!recipe) {
      createMutation.mutate(data);
      return;
    }

    updateMutation.mutate({ id: recipe.id, ...data });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-y-2 sm:gap-y-4"
    >
      <div className="grid w-full grid-cols-1 justify-center gap-x-4 sm:grid-cols-4">
        <div className="col-span-1 flex w-full flex-col justify-center border-2 border-dashed border-gray-500 p-2">
          <ImageEdit props={{ recipe, setValue }}></ImageEdit>
        </div>
        <div className="col-span-1 flex w-full flex-col justify-center border-2 border-dashed border-gray-500 p-2 sm:col-span-3">
          <NameEdit props={{ control, recipe, register, errors }}></NameEdit>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center border-2 border-dashed border-gray-500 p-2">
        <PlateCountEdit props={{ control }}></PlateCountEdit>
      </div>
      <div className="flex w-full flex-col justify-center border-2 border-dashed border-gray-500 p-2">
        <RecipeIngredientsEdit props={{ control }}></RecipeIngredientsEdit>
      </div>
      <div className="flex w-full flex-col justify-center border-2 border-dashed border-gray-500 p-2">
        <RecipeStepsEdit props={{ control }}></RecipeStepsEdit>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={!isDirty}
        variant="gradient"
      >
        {recipe ? "Sauvegarder" : "Créer"}
      </Button>
    </form>
  );
};
