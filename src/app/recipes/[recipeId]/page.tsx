import { api } from "@/src/trpc/server";
import { RecipeForm } from "@/src/app/components/recipe/RecipeForm";

export default async function RecipePage({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const recipe = await api.recipe.read.query({ id: recipeId });

  return (
    <div className="grid w-full grid-cols-2 gap-16 pt-4 sm:grid-cols-4 sm:pt-16 lg:grid-cols-6">
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
