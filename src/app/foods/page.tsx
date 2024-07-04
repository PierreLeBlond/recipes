import { CreateFood } from "@/src/app/components/food/create/CreateFood";
import { api } from "@/src/trpc/server";
import { Food } from "@/src/lib/types/Food";
import { getServerAuthSession } from "@/src/server/auth";
import { revalidatePath } from "next/cache";
import { FoodList } from "@/src/app/components/food/FoodList";
import { SearchInput } from "@/src/app/components/utils/SearchInput";

export default async function FoodPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { foods } = await api.food.list.query({});

  const search = (searchParams.search || "") as string;

  const session = await getServerAuthSession();

  const onSubmit = async (food: Food) => {
    "use server";

    const result = await api.food.create.mutate(food);
    revalidatePath("/foods");

    return result;
  };

  return (
    <div className="grid w-full gap-16 pt-8 xs:pt-16 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <CreateFood props={{ foods, session }} onSubmit={onSubmit} />
        </div>
        <div className="lg:col-span-3">
          <SearchInput
            props={{ label: "Recherche un ingrédient" }}
           />
        </div>
        <div className="lg:col-span-2 lg:col-start-2">
          <FoodList props={{ search }} />
        </div>
      </div>
  );
}
