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
    <div className="flex flex-col gap-16">
      <Title
        props={{
          title: "R-CP",
        }}
      ></Title>

      <form>
        <Input
          crossOrigin={""}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          label="Rechercher une recette"
          containerProps={{
            className: "!min-w-auto w-full",
          }}
          icon={<Search className="-translate-x-1 -translate-y-0.5"></Search>}
        />
      </form>
      <SessionProvider>
        <RecipeList props={{ search }}></RecipeList>
      </SessionProvider>
    </div>
  );
}
