import { Food } from "@/src/lib/types/Food";
import { ReactNode } from "react";

type FoodCardProps = {
  food: Food;
};

export function FoodCard({
  props: { food },
  children,
}: {
  props: FoodCardProps;
  children: ReactNode;
}) {
  return (
    <div className="border-secondary/20 flex rounded-t-md rounded-bl-md border shadow-md">
      <div className="flex w-full items-center justify-between p-2">
        {food.name}
        {children}
      </div>
    </div>
  );
}
