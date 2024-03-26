import { api } from "@/src/trpc/server";
import { RecipeForm } from "@/src/app/components/recipe/RecipeForm";
import { Button } from "@/src/lib/material";
import { ChevronLeft } from "lucide-react";

export default async function RecipePage({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const recipe = await api.recipe.read.query({ id: recipeId });

  return (
    <div className="grid w-full grid-cols-2 gap-16 sm:grid-cols-4 lg:grid-cols-6">
      <Button className="col-span-2" color="brown">
        <a href="/" className="flex items-center gap-2">
          <ChevronLeft strokeWidth={6} size={16} /> Recettes
        </a>
      </Button>
      <div className="col-span-2 sm:col-span-4 lg:col-span-6">
        <RecipeForm
          props={{
            recipe,
          }}
         />
      </div>
    </div>
  );
}
