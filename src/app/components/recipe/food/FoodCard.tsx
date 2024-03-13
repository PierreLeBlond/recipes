import { Food } from "@/prisma/generated/client";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

type FoodCardProps = {
  food: Food;
};

export const FoodCard = ({
  props: { food },
  children,
}: {
  props: FoodCardProps;
  children: ReactNode;
}) => {
  return (
    <div className="flex rounded-t-md rounded-bl-md border border-gray-900 shadow-fly">
      <div className="flex w-full items-center justify-between p-2">
        {food.name}
        {children}
      </div>
    </div>
  );
};
