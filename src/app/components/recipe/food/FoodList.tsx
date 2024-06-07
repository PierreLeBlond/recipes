"use client";

import { cn } from "@/src/lib/utils";
import { api } from "@/src/trpc/react";
import { LoaderCircle, Plus, ServerCrash } from "lucide-react";
import { Food } from "@/src/lib/types/Food";
import { Button } from "@/src/app/components/ui/button";
import { FoodCard } from "./FoodCard";

type FoodListProps = {
  search: string;
  pickedFoods: Food[];
  setPickedFoods: (foods: Food[]) => void;
  disabledFoods: Food[];
};

export function FoodList({
  props: { search, pickedFoods, setPickedFoods, disabledFoods },
}: {
  props: FoodListProps;
}) {
  const { status, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.food.list.useInfiniteQuery(
      { search, limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  if (status === "pending") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <LoaderCircle className="animate-spin text-edit" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <ServerCrash className="text-red-500" />
      </div>
    );
  }

  const disabledFoodNames = [
    ...disabledFoods.map((food) => food.name),
    ...pickedFoods.map((food) => food.name),
  ];

  const handlePickFood = (food: Food) => {
    if (disabledFoodNames.includes(food.name)) {
      return;
    }

    setPickedFoods([...pickedFoods, food]);
  };

  const foodList = data
    ? data.pages
        .flatMap((page) => page.foods)
        .map((food) => (
          <li key={food.id}>
            <button
              type="button"
              onClick={() => handlePickFood(food)}
              className={cn("group w-full hover:text-gray-900", {
                "border-gray-500 text-gray-500 hover:cursor-not-allowed hover:text-gray-500":
                  disabledFoodNames.includes(food.name),
              })}
            >
              <FoodCard props={{ food }}>
                {disabledFoodNames.includes(food.name) ? (
                  <span className="text-xs text-gray-500">
                    déjà utilisé dans la recette
                  </span>
                ) : (
                  <Plus
                    size={24}
                    className="invisible text-green-500 group-hover:visible"
                  />
                )}
              </FoodCard>
            </button>
          </li>
        ))
    : [];

  return (
    <>
      <ul className="flex flex-col gap-y-2 pb-2">{foodList}</ul>
      {hasNextPage && (
        <Button
          onClick={() => !isFetchingNextPage && fetchNextPage()}
          disabled={isFetchingNextPage || !hasNextPage}
          className="w-full"
        >
          {isFetchingNextPage ? "CHARGEMENT..." : "AFFICHER PLUS D'ALIMENTS"}
        </Button>
      )}
    </>
  );
}
