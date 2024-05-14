"use client";

import { useForm } from "react-hook-form";
import { Food } from "@/src/lib/types/Food";
import { Button, Typography } from "@/src/lib/material";
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
    <div className="flex flex-col gap-4">
      <Typography variant="h2">Ajouter un aliment</Typography>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <CreateFoodNameInput props={{ register, errors, foods }} />
        <CreateFoodDensityInput props={{ register, errors }} />
        <CreateFoodMassPerPieceInput props={{ register, errors }} />
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <Button
            className="col-start-2 lg:col-start-4"
            type="submit"
            color="blue-gray"
            variant="filled"
            disabled={!isDirty}
            ripple={false}
          >
            Ajouter
          </Button>
        </div>
      </form>
      {lastCreatedFood && (
        <div>{`L'aliment '${lastCreatedFood.name}' a bien été ajouté.`}</div>
      )}
    </div>
  );
}
