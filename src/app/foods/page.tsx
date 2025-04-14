"use client";

import { FoodList } from "@/src/app/components/food/FoodList";
import { SearchInput } from "@/src/app/components/utils/SearchInput";
import { CreateFoodButton } from "@/src/app/components/food/create/CreateFoodButton";
import { SessionProvider } from "next-auth/react";

export default function FoodPage() {
  return (
    <div className="xs:gap-16 xs:pt-16 grid w-full gap-8 pt-8 lg:grid-cols-4">
      <div className="xs:p-0 w-full justify-self-center px-4 lg:col-span-4 lg:w-2/3">
        <SearchInput props={{ label: "Recherche un aliment" }} />
      </div>
      <div className="flex flex-col gap-2 lg:col-span-2 lg:col-start-2">
        <SessionProvider
          basePath={`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`}
        >
          <CreateFoodButton />
          <FoodList />
        </SessionProvider>
      </div>
    </div>
  );
}
