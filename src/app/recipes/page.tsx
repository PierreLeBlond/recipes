"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Input } from "@/src/app/components/ui/input";
import { RecipeList } from "@/src/app/components/recipe/RecipeList";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-8 pt-8 sm:gap-16 sm:pt-16">
      <form className="px-4 sm:w-2/3">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          label="Rechercher une recette"
          icon={<Search className="-translate-x-1 -translate-y-0.5" />}
        />
      </form>
      <SessionProvider>
        <RecipeList props={{ search }} />
      </SessionProvider>
    </div>
  );
}
