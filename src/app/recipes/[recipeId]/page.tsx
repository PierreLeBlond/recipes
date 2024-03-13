import { api } from "@/src/trpc/server";
import { Recipe } from "@/src/app/components/recipe/Recipe";
import { Button } from "@/src/lib/material";
import { ChevronLeft, Pencil } from "lucide-react";

export default async function RecipePage({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const recipe = await api.recipe.read.query({ id: recipeId });

  return (
    <div className="flex w-full flex-col justify-center p-2 sm:p-8 lg:p-16">
      <div className="flex w-full justify-between pb-8 sm:pb-4">
        <Button className="flex w-16 items-center justify-center" color="white">
          <a href={`/`}>
            <ChevronLeft strokeWidth={4}></ChevronLeft>
          </a>
        </Button>
        <Button
          className="flex w-16 items-center justify-center"
          variant="gradient"
        >
          <a href={`/recipes/${recipeId}/edit`}>
            <Pencil strokeWidth={4}></Pencil>
          </a>
        </Button>
      </div>
      <Recipe props={{ recipe }}></Recipe>
    </div>
  );
}
