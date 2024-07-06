"use client";

import { FoodList } from "@/src/app/components/food/FoodList";
import { SearchInput } from "@/src/app/components/utils/SearchInput";
import { CreateFoodButton } from "@/src/app/components/food/create/CreateFoodButton";
import { SessionProvider } from "next-auth/react";

export default function FoodPage() {
  return (
    <div className="grid w-full gap-8 pt-8 xs:gap-16 xs:pt-16 lg:grid-cols-4">
      <div className="px-4 xs:p-0 lg:col-span-3">
        <SearchInput props={{ label: "Recherche un aliment" }} />
      </div>
      <div className="flex flex-col gap-2 lg:col-span-2 lg:col-start-2">
        <SessionProvider>
          <CreateFoodButton />
        </SessionProvider>
        <FoodList />
      </div>
    </div>
  );
}
