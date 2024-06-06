import { useFieldArray } from "react-hook-form";
import { useState } from "react";
import { useGrab } from "@/src/lib/hooks/useGrab";
import { cn } from "@/src/lib/utils";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { Food } from "@/src/lib/types/Food";
import { RecipeIngredient } from "./ingredient/RecipeIngredient";
import { FoodPickerDialog } from "../food/FoodPickerDialog";
import { RecipeIngredientEdit } from "./ingredient/RecipeIngredientEdit";
import { Button } from "../../ui/button";

export function RecipeIngredients() {
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
    108,
    move,
    fields.map((field) => field.id),
  );

  const handlePickedFoods = (pickedFoods: Food[]) => {
    append(
      pickedFoods.map((pickedFood) => ({
        quantity: 0,
        food: pickedFood,
        unit: queryState.units[pickedFood.name] || pickedFood.unit,
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
      <h2 className="text-2xl lg:col-span-3">INGRÉDIENTS</h2>
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
              <li key={field.food.name}>
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
                    onGrab={(event) => handleGrab(event, field.id)}
                  />
                ) : (
                  <RecipeIngredient
                    props={{
                      ingredient: {
                        ...field,
                        unit:
                          queryState.units[field.food.name] || field.food.unit,
                      },
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p
          className={cn("text-center lg:col-span-3", {
            "text-blue-gray-500": queryState.edit,
          })}
        >
          {queryState.edit
            ? "Ajoutez des ingrédients à votre recette"
            : "Pas d'ingrédients"}
        </p>
      )}
      <Button
        onClick={() => setOpen(true)}
        disabled={!queryState.edit}
        variant="edit"
        className={cn("transition-all duration-300 lg:col-start-3", {
          "pointer-events-none !h-0 translate-y-10 !opacity-0 lg:!h-8 lg:translate-x-40 lg:translate-y-0":
            !queryState.edit,
        })}
      >
        AJOUTER DES INGRÉDIENTS
      </Button>
      <FoodPickerDialog
        props={{
          open,
          setOpen,
          handlePickedFoods,
          disabledFoods: fields.map((field) => field.food),
        }}
      />
    </div>
  );
}
