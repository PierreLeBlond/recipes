import { Food } from "@/prisma/generated/client";
import { DeleteFoodButton } from "./edit/DeleteFoodButton";

type FoodItemProps = {
  food: Food;
};

export function FoodItem({ props: { food } }: { props: FoodItemProps }) {
  return (
    <div className="flex items-center justify-between border border-edit p-2 shadow-lg">
      <p>{food.name}</p>
      <DeleteFoodButton props={{ id: food.id }} />
    </div>
  );
}
