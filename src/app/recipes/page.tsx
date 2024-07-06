"use client";

import { SessionProvider } from "next-auth/react";
import { RecipeList } from "@/src/app/components/recipe/RecipeList";
import { SearchInput } from "../components/utils/SearchInput";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pt-8 sm:gap-16 sm:pt-16">
      <div className="sm:w-2/3">
        <SearchInput props={{ label: "Recherche une recette" }} />
      </div>
      <SessionProvider>
        <RecipeList />
      </SessionProvider>
    </div>
  );
}
