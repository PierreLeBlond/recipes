import { Button } from "@/src/lib/material";
import { ChevronLeft } from "lucide-react";
import { CreateFood } from "@/src/app/components/recipe/food/CreateFood";
import { api } from "@/src/trpc/server";
import { Food } from "@/src/lib/types/Food";

export default async function FoodPage() {
  const result = await api.food.list.query({});

  const onSubmit = async (food: Food) => {
    "use server";

    return await api.food.create.mutate(food);
  };

  return (
    <div className="grid w-full grid-cols-2 gap-16 pt-16 sm:grid-cols-4 lg:grid-cols-6">
      <div className="col-span-2 sm:col-span-4 lg:col-span-6">
        <CreateFood props={{ foods: result.foods }} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
