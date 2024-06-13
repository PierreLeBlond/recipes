"use client";

import { useForm } from "react-hook-form";
import { Food } from "@/src/lib/types/Food";
import { useState } from "react";
import { SuccessAlert } from "@/src/app/components/utils/alert/SuccessAlert";
import { Button } from "@/src/app/components/ui/button";
import { Session } from "next-auth";
import { useEditState } from "@/src/lib/hooks/useEditState";
import { CreateFoodNameInput } from "./CreateFoodNameInput";
import { CreateFoodDensityInput } from "./CreateFoodDensityInput";
import { CreateFoodMassPerPieceInput } from "./CreateFoodMassPerPieceInput";
import { FormFood } from "./FormFood";
import { CreateFoodUnitInput } from "./CreateFoodUnitInput";
import { Typography } from "../../ui/typography";
import { ErrorAlert } from "../../utils/alert/ErrorAlert";

type CreateFoodHandlers = {
  onSubmit: (food: Food) => Promise<Food>;
};

type CreateFoodPropsType = {
  foods: Food[];
  session: Session | null;
};

export function CreateFood({
  props: { foods, session },
  onSubmit,
}: {
  props: CreateFoodPropsType;
} & CreateFoodHandlers) {
  const [lastCreatedFood, setLastCreatedFood] = useState<Food | null>(null);

  const edit = useEditState(session);

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
    <div className="flex w-80 flex-col gap-8 px-4 xs:p-0">
      <Typography variant="h3">Ajouter un aliment</Typography>
      {edit ? (
        <>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <CreateFoodNameInput props={{ register, errors, foods }} />
            <CreateFoodUnitInput props={{ control, errors }} />
            <CreateFoodDensityInput props={{ register, errors }} />
            <CreateFoodMassPerPieceInput props={{ register, errors }} />
            <div className="flex justify-end">
              <Button type="submit" variant="edit" disabled={!isDirty}>
                AJOUTER
              </Button>
            </div>
          </form>
          {lastCreatedFood && (
            <SuccessAlert>{`L'aliment '${lastCreatedFood.name}' a bien été ajouté.`}</SuccessAlert>
          )}{" "}
        </>
      ) : (
        <ErrorAlert>Fonctionnalité réservé aux administrateurs</ErrorAlert>
      )}
    </div>
  );
}
