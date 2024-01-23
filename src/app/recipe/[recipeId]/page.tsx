import { api } from "@/src/trpc/server";
import { Quantity } from "@/src/app/components/ingredient/Quantity";
import { Step } from "@/src/app/components/recipe/Step";
import { PlateCount } from "@/src/app/components/recipe/PlateCount";
import { Recipe } from "../../components/recipe/Recipe";

export default async function RecipePage({
  params,
}: {
  params: { recipeId: string };
}) {
  const recipe = await api.recipe.read.query({ id: parseInt(params.recipeId) });

  return (
    <div className="flex w-full flex-col justify-center p-16">
      <h1 className="w-full bg-gray-300 bg-clip-text text-[5rem] font-extrabold leading-none tracking-tight text-transparent [text-shadow:4px_4px_0px_rgba(255,255,255,0.6)]">
        {recipe.name}
      </h1>
      <h3 className="indent-1 font-bold">{recipe.description}</h3>
      <Recipe props={{ recipe }}></Recipe>
    </div>
  );
}
