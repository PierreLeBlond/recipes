"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Input } from "../lib/material";
import { Title } from "./components/utils/Title";
import { RecipeList } from "./components/recipe/RecipeList";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-16">
      <Title
        props={{
          title: "R-CP",
        }}
       />

      <form>
        <Input
          crossOrigin=""
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          label="Rechercher une recette"
          containerProps={{
            className: "!min-w-auto w-full",
          }}
          icon={<Search className="-translate-x-1 -translate-y-0.5" />}
        />
      </form>
      <SessionProvider>
        <RecipeList props={{ search }} />
      </SessionProvider>
    </div>
  );
}
