import { Control, useFieldArray } from "react-hook-form";
import { RecipeIngredientEdit } from "./ingredient/RecipeIngredientEdit";
import { Button, Typography } from "@/src/lib/material";
import { FoodPickerDialog } from "../food/FoodPickerDialog";
import { useState } from "react";
import { Food, Recipe } from "@/prisma/generated/client";
import { useGrab } from "@/src/lib/hooks/useGrab";
import { RecipeIngredient } from "./ingredient/RecipeIngredient";
import { cn } from "@/src/lib/utils";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { FormInputs } from "@/src/lib/types/FormInputs";

export const RecipeIngredients = () => {
  const { fields, append, update, remove, move } = useFieldArray<
    FormInputs,
    "ingredients"
  >({
    name: "ingredients",
  });
  const [open, setOpen] = useState(false);
  const queryState = useQueryState();

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
    <div className="grid gap-4 lg:grid-cols-3">
      <Typography variant="h2" className="lg:col-span-3">
        INGRÉDIENTS
      </Typography>
      {fields.length !== 0 ? (
        <div
          ref={scrollAreaRef}
          onPointerMove={(event) => handlePointerMove(event)}
          onPointerUp={(event) => handlePointerUp(event)}
          onContextMenu={(event) => handleContextMenu(event)}
          className="select-none overflow-y-auto lg:col-span-3"
        >
          <ul className="relative flex list-inside flex-col gap-4">
            {fields.map((field, index) => (
              <li key={index}>
                {queryState.edit ? (
                  <RecipeIngredientEdit
                    props={{
                      ingredient: field,
                      handleRemovedIngredient: () =>
                        handleRemovedIngredient(index),
                      handleUpdatedQuantity: (quantity: number) =>
                        handleUpdatedQuantity(index, quantity),
                      grabbed: grabbedId === field.id,
                      grabbedPosition,
                    }}
                    onGrab={(event, id: string) => handleGrab(event, id)}
                  ></RecipeIngredientEdit>
                ) : (
                  <RecipeIngredient
                    props={{
                      ingredient: field,
                    }}
                  ></RecipeIngredient>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Typography
          className={cn("text-center lg:col-span-3", {
            "text-blue-gray-500": queryState.edit,
          })}
        >
          {queryState.edit
            ? "Ajoutez des ingrédients à votre recette"
            : "Pas d'ingrédients"}
        </Typography>
      )}
      <Button
        onClick={() => setOpen(true)}
        disabled={!queryState.edit}
        className={cn("transition-all duration-300 lg:col-start-3", {
          "pointer-events-none !h-0 translate-y-10 !opacity-0 lg:!h-8 lg:translate-x-40 lg:translate-y-0":
            !queryState.edit,
        })}
        color="blue-gray"
        variant="filled"
      >
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
