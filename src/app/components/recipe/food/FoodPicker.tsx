"use client";

import { Input } from "@/src/lib/material";
import { ArrowBigDown, ArrowBigDownDash, Search, X } from "lucide-react";
import { useState } from "react";
import { FoodCard } from "./FoodCard";
import { Food } from "@/prisma/generated/client";
import { FoodList } from "./FoodList";

type FoodPickerProps = {
  pickedFoods: Food[];
  setPickedFoods: (foods: Food[]) => void;
  disabledFoods: Food[];
};

export const FoodPicker = ({
  props: { pickedFoods, setPickedFoods, disabledFoods },
}: {
  props: FoodPickerProps;
}) => {
  const [search, setSearch] = useState("");

  const pickedFoodList = pickedFoods.map((food: Food) => (
    <li
      key={`picked_${food.id}`}
      onClick={() => {
        setPickedFoods(
          pickedFoods.filter((pickedFood) => pickedFood.id !== food.id),
        );
      }}
      className="group hover:cursor-pointer hover:text-gray-900"
    >
      <FoodCard props={{ food }}>
        <X size={24} className="invisible text-red-500 group-hover:visible"></X>
      </FoodCard>
    </li>
  ));

  return (
    <div className="relative flex h-full flex-col gap-y-4">
      <form className="w-full">
        <Input
          crossOrigin={""}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          label="Rechercher un ingredient"
          className="w-full rounded-full"
          containerProps={{
            className: "max-w-xs md:max-w-full",
          }}
          icon={
            <Search className="-translate-x-1 -translate-y-0.5 text-orange-500"></Search>
          }
        />
      </form>
      <div className="relative flex min-h-0 grow flex-col gap-y-4">
        <ArrowBigDown
          size={80}
          strokeWidth={0.5}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-10 fill-gray-200 text-gray-900"
        ></ArrowBigDown>
        <div className="h-1/2 overflow-hidden rounded-md border border-gray-900 p-2">
          <div className="h-full overflow-y-scroll p-2">
            <FoodList
              props={{ search, pickedFoods, setPickedFoods, disabledFoods }}
            ></FoodList>
          </div>
        </div>
        <div className="h-1/2 overflow-y-scroll rounded-md border border-gray-900 p-2">
          <ul className="flex flex-col gap-y-2">{pickedFoodList}</ul>
        </div>
      </div>
    </div>
  );
};
