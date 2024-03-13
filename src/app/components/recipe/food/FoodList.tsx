"use client";

import { Food } from "@/prisma/generated/client";
import { Button, Spinner } from "@/src/lib/material";
import { cn } from "@/src/lib/utils";
import { api } from "@/src/trpc/react";
import { Plus, ServerCrash } from "lucide-react";
import { FoodCard } from "./FoodCard";

type FoodListProps = {
  search: string;
  pickedFoods: Food[];
  setPickedFoods: (foods: Food[]) => void;
  disabledFoods: Food[];
};

export const FoodList = ({
  props: { search, pickedFoods, setPickedFoods, disabledFoods },
}: {
  props: FoodListProps;
}) => {
  const { status, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.food.list.useInfiniteQuery(
      { search, limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  if (status === "loading") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <Spinner className="text-orange-500"></Spinner>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <ServerCrash className="text-red-500"></ServerCrash>
      </div>
    );
  }

  const disabledFoodIds = [
    ...disabledFoods.map((food) => food.id),
    ...pickedFoods.map((food) => food.id),
  ];

  const handlePickFood = (food: Food) => {
    if (disabledFoodIds.includes(food.id)) {
      return;
    }

    setPickedFoods([...pickedFoods, food]);
  };

  const foodList = data
    ? data.pages
        .flatMap((page) => page.foods)
        .map((food) => (
          <li
            key={food.id}
            onClick={() => handlePickFood(food)}
            className={cn("group hover:cursor-pointer hover:text-gray-900", {
              "border-gray-500 text-gray-500 hover:cursor-not-allowed hover:text-gray-500":
                disabledFoodIds.includes(food.id),
            })}
          >
            <FoodCard props={{ food }}>
              {disabledFoodIds.includes(food.id) ? (
                <span className="text-xs text-gray-500">
                  déjà utilisé dans la recette
                </span>
              ) : (
                <Plus
                  size={24}
                  className="invisible text-green-500 group-hover:visible"
                ></Plus>
              )}
            </FoodCard>
          </li>
        ))
    : [];

  return (
    <>
      <ul className="flex flex-col gap-y-2 pb-2">{foodList}</ul>
      <Button
        onClick={() => !isFetchingNextPage && fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
        className="w-full"
        color="white"
      >
        {isFetchingNextPage
          ? "Chargement..."
          : hasNextPage
            ? "Afficher plus d'ingrédients"
            : "Pas d'autres ingrédients à afficher"}
      </Button>
    </>
  );
};
