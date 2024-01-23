import { Search } from "lucide-react";
import { Input } from "./components/material";
import { RecipeCard } from "./components/recipe/RecipeCard";
import { api } from "@/src/trpc/server";

export default async function HomePage() {
  const recipes = await api.recipe.list.query();

  const recipeList = recipes.map((recipe) => (
    <div
      className="flex aspect-square max-w-xs justify-center p-4"
      key={recipe.id}
    >
      <RecipeCard props={recipe} />
    </div>
  ));

  return (
    <div className="container flex flex-col items-center justify-center gap-4 px-4 py-4">
      <h1 className="bg-gray-300 bg-clip-text text-[5rem] font-extrabold tracking-tight text-transparent [text-shadow:4px_4px_0px_rgba(255,255,255,0.6)]">
        R-CP
      </h1>
      <h3>Des recettes de cuisine. Claires. Concises. Pratiques.</h3>

      <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2 lg:grid-cols-3">
        <h2 className="col-span-1 pt-16 text-start text-4xl font-extrabold md:col-span-2 lg:col-span-3">
          Motivations
        </h2>
        <div className="flex max-w-xs flex-col justify-center gap-4 rounded-3xl p-2">
          Se débarasser des pubs et des infos innutiles.
        </div>
        <div className="flex max-w-xs flex-col justify-center gap-4 rounded-3xl p-2">
          Garder la liste des ingrédients et les quantités sous la main à tout
          moment.
        </div>
        <div className="flex max-w-xs flex-col justify-center gap-4 rounded-3xl p-2">
          Comprendre les étapes et leur fonction.
        </div>
        <form className="col-span-1 flex justify-center pt-16 md:col-span-2 lg:col-span-3">
          <Input
            type="search"
            label="Rechercher une recette"
            className="max-w-xs rounded-full !border-0 !bg-gray-300/30 shadow-pressed md:max-w-full"
            color="gray"
            labelProps={{
              className:
                "before:!border-0 after:!border-0 peer-placeholder-shown:!leading-[5] peer-focus:!leading-tight !-top-4 peer-focus:!text-gray-700 !text-gray-600",
            }}
            icon={
              <Search className="-translate-x-1 -translate-y-0.5 text-gray-500"></Search>
            }
          />
        </form>
        {recipeList}
      </div>
    </div>
  );
}
