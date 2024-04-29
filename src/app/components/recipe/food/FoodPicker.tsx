"use client";

import { Input } from "@/src/lib/material";
import { ArrowBigDown, Search, X } from "lucide-react";
import { useState } from "react";
import { Food } from "@/src/lib/types/Food";
import { FoodCard } from "./FoodCard";
import { FoodList } from "./FoodList";

type FoodPickerProps = {
  pickedFoods: Food[];
  setPickedFoods: (foods: Food[]) => void;
  disabledFoods: Food[];
};

export function FoodPicker({
  props: { pickedFoods, setPickedFoods, disabledFoods },
}: {
  props: FoodPickerProps;
}) {
  const [search, setSearch] = useState("");

  const pickedFoodList = pickedFoods.map((food: Food) => (
    <li key={`picked_${food.name}`}>
      <button
        aria-label="retirer l'ingrédient"
        type="button"
        onClick={() => {
          setPickedFoods(
            pickedFoods.filter((pickedFood) => pickedFood.name !== food.name),
          );
        }}
        className="group w-full hover:text-blue-gray-900"
      >
        <FoodCard props={{ food }}>
          <X size={24} className="invisible text-red-500 group-hover:visible" />
        </FoodCard>
      </button>
    </li>
  ));

  return (
    <div className="relative flex h-full flex-col gap-y-4">
      <form className="w-full">
        <Input
          crossOrigin=""
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          label="Rechercher un ingredient"
          color="blue-gray"
          containerProps={{
            className: "max-w-xs md:max-w-full",
          }}
          icon={
            <Search className="-translate-x-1 -translate-y-0.5 text-blue-gray-500" />
          }
        />
      </form>
      <div className="relative flex min-h-0 grow flex-col gap-y-4">
        <ArrowBigDown
          size={80}
          strokeWidth={0.5}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-10 fill-gray-200 text-gray-900"
        />
        <div className="h-1/2 overflow-hidden rounded-md border border-blue-gray-500 p-2">
          <div className="h-full overflow-y-scroll p-2">
            <FoodList
              props={{ search, pickedFoods, setPickedFoods, disabledFoods }}
            />
          </div>
        </div>
        <div className="h-1/2 overflow-y-scroll rounded-md border border-blue-gray-500 p-2">
          <ul className="flex flex-col gap-y-2">{pickedFoodList}</ul>
        </div>
      </div>
    </div>
  );
}
