import { CreateFood } from "@/src/app/components/recipe/food/CreateFood";
import { api } from "@/src/trpc/server";
import { Food } from "@/src/lib/types/Food";
import { getServerAuthSession } from "@/src/server/auth";

export default async function FoodPage() {
  const result = await api.food.list.query({});

  const session = await getServerAuthSession();

  const onSubmit = async (food: Food) => {
    "use server";

    return api.food.create.mutate(food);
  };

  return (
    <div className="grid w-full grid-cols-2 gap-16 pt-8 xs:pt-16 sm:grid-cols-4 lg:grid-cols-6">
      <div className="col-span-2 sm:col-span-4 lg:col-span-6">
        <CreateFood
          props={{ foods: result.foods, session }}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
