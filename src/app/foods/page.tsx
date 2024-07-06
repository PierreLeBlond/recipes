"use client";

import { CreateFood } from "@/src/app/components/food/create/CreateFood";
import { FoodList } from "@/src/app/components/food/FoodList";
import { SearchInput } from "@/src/app/components/utils/SearchInput";
import { SessionProvider } from "next-auth/react";

export default function FoodPage() {
  return (
    <div className="grid w-full gap-16 pt-8 xs:pt-16 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <SessionProvider>
          <CreateFood />
        </SessionProvider>
      </div>
      <div className="lg:col-span-3">
        <SearchInput props={{ label: "Recherche un ingrédient" }} />
      </div>
      <div className="lg:col-span-2 lg:col-start-2">
        <FoodList />
      </div>
    </div>
  );
}
