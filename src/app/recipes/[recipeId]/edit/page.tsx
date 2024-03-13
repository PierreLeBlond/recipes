import { api } from "@/src/trpc/server";
import { Button } from "@/src/lib/material";
import { ChevronLeft } from "lucide-react";
import { RecipeEdit } from "@/src/app/components/recipe/edit/RecipeEdit";

export default async function RecipeEditPage({
  params,
}: {
  params: { recipeId: string };
}) {
  const recipe = await api.recipe.read.query({ id: params.recipeId });

  return (
    <div className="flex w-full flex-col justify-center p-2 sm:p-8 lg:p-16">
      <div className="pb-2 sm:pb-4">
        <Button
          className="flex w-16 items-center justify-center p-2"
          color="white"
        >
          <a href="/">
            <ChevronLeft strokeWidth={6} size={16}></ChevronLeft>
          </a>
        </Button>
      </div>
      <RecipeEdit props={{ recipe }}></RecipeEdit>
    </div>
  );
}
