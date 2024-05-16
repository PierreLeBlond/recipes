"use client";

import { useForm } from "react-hook-form";
import { Food } from "@/src/lib/types/Food";
import { Alert, Button, Typography } from "@/src/lib/material";
import { useState } from "react";
import { Leaf } from "lucide-react";
import { CreateFoodNameInput } from "./CreateFoodNameInput";
import { CreateFoodDensityInput } from "./CreateFoodDensityInput";
import { CreateFoodMassPerPieceInput } from "./CreateFoodMassPerPieceInput";
import { FormFood } from "./FormFood";
import { CreateFoodUnitInput } from "./CreateFoodUnitInput";

type CreateFoodHandlers = {
  onSubmit: (food: Food) => Promise<Food>;
};

type CreateFoodPropsType = {
  foods: Food[];
};

export function CreateFood({
  props: { foods },
  onSubmit,
}: {
  props: CreateFoodPropsType;
} & CreateFoodHandlers) {
  const [lastCreatedFood, setLastCreatedFood] = useState<Food | null>(null);

  const {
    handleSubmit,
    register,
    formState: { isDirty, errors },
  } = useForm<FormFood>({
    defaultValues: {
      name: "",
      density: "",
      massPerPiece: "",
      unit: "GRAM",
      image: "",
    },
  });

  const handleFormSubmit = async (food: FormFood) => {
    const result = await onSubmit({
      name: food.name,
      density: food.density ? parseFloat(food.density) : null,
      massPerPiece: food.massPerPiece ? parseFloat(food.massPerPiece) : null,
      unit: food.unit,
      image: food.image || null,
    });
    setLastCreatedFood(result);
  };

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2">Ajouter un aliment</Typography>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <CreateFoodNameInput props={{ register, errors, foods }} />
        <CreateFoodUnitInput props={{ register }} />
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
        <Alert
          color="green"
          icon={<Leaf />}
        >{`L'aliment '${lastCreatedFood.name}' a bien été ajouté.`}</Alert>
      )}
    </div>
  );
}
