"use client";

import { useForm } from "react-hook-form";
import { Food } from "@/src/lib/types/Food";
import { useState } from "react";
import { SuccessAlert } from "@/src/app/components/utils/alert/SuccessAlert";
import { Button } from "@/src/app/components/ui/button";
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
    control,
    formState: { isDirty, errors },
  } = useForm<FormFood>({
    defaultValues: {
      name: "",
      density: "",
      massPerPiece: "",
    },
  });

  const handleFormSubmit = async (food: FormFood) => {
    const result = await onSubmit({
      name: food.name,
      density: food.density ? parseFloat(food.density) : null,
      massPerPiece: food.massPerPiece ? parseFloat(food.massPerPiece) : null,
      unit: food.unit,
    });
    setLastCreatedFood(result);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">Ajouter un aliment</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <CreateFoodNameInput props={{ register, errors, foods }} />
        <CreateFoodUnitInput props={{ control, errors }} />
        <CreateFoodDensityInput props={{ register, errors }} />
        <CreateFoodMassPerPieceInput props={{ register, errors }} />
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <Button
            className="col-start-2 lg:col-start-4"
            type="submit"
            variant="edit"
            disabled={!isDirty}
          >
            Ajouter
          </Button>
        </div>
      </form>
      {lastCreatedFood && (
        <SuccessAlert>{`L'aliment '${lastCreatedFood.name}' a bien été ajouté.`}</SuccessAlert>
      )}
    </div>
  );
}
