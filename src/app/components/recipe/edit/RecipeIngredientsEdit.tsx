import { Control, useFieldArray } from "react-hook-form";
import { RecipeIngredientEdit } from "./RecipeIngredientEdit";
import { Button } from "@/src/lib/material";
import { FormInputs } from "./FormInputs";
import { FoodPickerDialog } from "../food/FoodPickerDialog";
import { useState } from "react";
import { Food } from "@/prisma/generated/client";
import { useGrab } from "@/src/lib/hooks/useGrab";

type RecipeIngredientsEditProps = {
  control: Control<FormInputs>;
};

export const RecipeIngredientsEdit = ({
  props: { control },
}: {
  props: RecipeIngredientsEditProps;
}) => {
  const { fields, append, update, remove, move } = useFieldArray({
    control,
    name: "ingredients",
  });
  const [open, setOpen] = useState(false);

  const {
    scrollAreaRef,
    handlePointerMove,
    handlePointerUp,
    handleGrab,
    handleContextMenu,
    grabbedPosition,
    grabbedId,
  } = useGrab(
    64,
    move,
    fields.map((field) => field.id),
  );

  const handlePickedFoods = (pickedFoods: Food[]) => {
    append(
      pickedFoods.map((pickedFood) => ({
        quantity: 0,
        foodName: pickedFood.name,
        food: pickedFood,
      })),
    );
  };

  const handleRemovedIngredient = (index: number) => {
    remove(index);
  };

  const handleUpdatedQuantity = (index: number, quantity: number) => {
    const field = fields[index];
    if (!field) {
      return;
    }
    update(index, { ...field, quantity });
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <h2 className="text-4xl font-bold tracking-tighter text-gray-800">
        INGRÉDIENTS
      </h2>
      <div
        ref={scrollAreaRef}
        onPointerMove={(event) => handlePointerMove(event)}
        onPointerUp={(event) => handlePointerUp(event)}
        onContextMenu={(event) => handleContextMenu(event)}
        className="mb-4 w-full select-none overflow-y-auto"
      >
        <ul className="relative flex list-inside flex-col gap-4 pb-4">
          {fields.map((field, index) => (
            <li key={index}>
              <RecipeIngredientEdit
                props={{
                  ingredient: field,
                  handleRemovedIngredient: () => handleRemovedIngredient(index),
                  handleUpdatedQuantity: (quantity: number) =>
                    handleUpdatedQuantity(index, quantity),
                  grabbed: grabbedId === field.id,
                  grabbedPosition,
                }}
                onGrab={(event, id: string) => handleGrab(event, id)}
              ></RecipeIngredientEdit>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={() => setOpen(true)} variant="gradient">
        Ajouter des ingrédients
      </Button>
      <FoodPickerDialog
        props={{
          open,
          setOpen,
          handlePickedFoods,
          disabledFoods: fields.map((field) => field.food),
        }}
      ></FoodPickerDialog>
    </div>
  );
};
