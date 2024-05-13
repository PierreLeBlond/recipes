"use client";

import { useForm } from "react-hook-form";
import { Food } from "@/src/lib/types/Food";
import { CreateFoodNameInput } from "./CreateFoodNameInput";
import { CreateFoodDensityInput } from "./CreateFoodDensityInput";
import { CreateFoodMassPerPieceInput } from "./CreateFoodMassPerPieceInput";

type CreateFoodHandlers = {
  onSubmit: (food: Food) => void;
};

type CreateFoodPropsType = {
  lastCreatedFood: Food | null;
  foods: Food[];
};

export function CreateFood({
  props: { lastCreatedFood, foods },
  onSubmit,
}: {
  props: CreateFoodPropsType;
} & CreateFoodHandlers) {
  const {
    handleSubmit,
    register,
    formState: { isDirty, errors },
  } = useForm<Food>({
    defaultValues: {
      name: "",
      density: null,
      massPerPiece: null,
      unit: "GRAM",
      image: null,
    },
  });

  return (
    <>
      Ajouter un aliment
      <form onSubmit={handleSubmit(onSubmit)}>
        <CreateFoodNameInput props={{ register, errors, foods }} />
        <CreateFoodDensityInput props={{ register, errors }} />
        <CreateFoodMassPerPieceInput props={{ register, errors }} />
        <button type="submit" disabled={!isDirty}>
          Ajouter
        </button>
      </form>
      {lastCreatedFood && (
        <div>{`L'aliment '${lastCreatedFood.name}' a bien été ajouté.`}</div>
      )}
    </>
  );
}
