import { Food } from "@/prisma/generated/client";
import { useSession } from "next-auth/react";
import { DeleteFoodButton } from "./edit/DeleteFoodButton";
import { EditFoodButton } from "./edit/EditFoodButton";

type FoodItemProps = {
  food: Food;
};

export function FoodItem({ props: { food } }: { props: FoodItemProps }) {
  const session = useSession();
  const canEditFood = session.data?.user.role === "ADMIN";

  return (
    <div className="flex items-center justify-between border-y border-edit p-2 shadow-lg xs:border-x">
      <p>{food.name}</p>
      <div className="flex">
        {canEditFood && (
          <>
            <EditFoodButton props={{ food }} />
            <DeleteFoodButton props={{ id: food.id, name: food.name }} />
          </>
        )}
      </div>
    </div>
  );
}
