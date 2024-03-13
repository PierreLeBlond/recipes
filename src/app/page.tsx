"use client";

import { Search } from "lucide-react";
import { Input } from "../lib/material";
import { Title } from "./components/utils/Title";
import { useState } from "react";
import { RecipeList } from "./components/recipe/RecipeList";
import { SessionProvider } from "next-auth/react";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-4 py-4 lg:px-8">
      <Title props={{ title: "R-CP" }}></Title>
      <h3 className="border border-gray-900 p-2 shadow-fly">
        Des recettes de cuisine. Claires. Concises. Pratiques.
      </h3>

      <form className="flex w-full justify-center pt-4 lg:pt-16">
        <Input
          crossOrigin={""}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          label="Rechercher une recette"
          className="w-full rounded-full"
          containerProps={{
            className: "max-w-xs md:max-w-full",
          }}
          icon={
            <Search className="-translate-x-1 -translate-y-0.5 text-orange-500"></Search>
          }
        />
      </form>
      <SessionProvider>
        <RecipeList props={{ search }}></RecipeList>
      </SessionProvider>
    </div>
  );
}
