import { useFieldArray, useFormContext } from "react-hook-form";
import { useState } from "react";
import { useGrab } from "@/src/lib/hooks/useGrab";
import { cn } from "@/src/lib/utils";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { Food } from "@/src/lib/types/Food";
import { useUnitsQuery } from "@/src/lib/hooks/useUnitsQuery";
import { useSession } from "next-auth/react";
import { useEditQuery } from "@/src/lib/hooks/useEditQuery";
import { RecipeIngredient } from "./ingredient/RecipeIngredient";
import { FoodPickerDialog } from "../food/FoodPickerDialog";
import { RecipeIngredientEdit } from "./ingredient/RecipeIngredientEdit";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";

/*
 * This should used unucontrolled inputs to avoid rerendering the whole form
 */
export function RecipeIngredients() {
  const { fields, append, remove, move } = useFieldArray<
    FormInputs,
    "ingredients"
  >({
    name: "ingredients",
  });
  const { setValue } = useFormContext<FormInputs>();
  const [open, setOpen] = useState(false);
  const session = useSession();
  const edit = useEditQuery(session.data);
  const unitsQuery = useUnitsQuery();

  const {
    scrollAreaRef,
    handlePointerMove,
    handlePointerUp,
    handleGrab,
    handleContextMenu,
    grabbedPosition,
    grabbedId,
  } = useGrab(
    66,
    move,
    fields.map((field) => field.id),
  );

  const handlePickedFoods = (pickedFoods: Food[]) => {
    append(
      pickedFoods.map((pickedFood) => ({
        quantity: 0,
        food: pickedFood,
        unit: unitsQuery[pickedFood.name] || pickedFood.unit,
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

    setValue(`ingredients.${index}.quantity`, quantity, { shouldDirty: true });
  };

  return (
    <div className="grid max-w-full gap-4 px-4 xs:px-0 lg:grid-cols-3">
      <Typography variant="h2" className="text-2xl lg:col-span-3">
        INGRÉDIENTS
      </Typography>
      {fields.length !== 0 ? (
        <div
          ref={scrollAreaRef}
          onPointerMove={(event) => handlePointerMove(event)}
          onPointerUp={(event) => handlePointerUp(event)}
          onContextMenu={(event) => handleContextMenu(event)}
          className="select-none overflow-hidden lg:col-span-3"
        >
          <ul className="relative flex list-inside flex-col gap-4 pb-4">
            {fields.map((field, index) => (
              <li key={field.food.name}>
                {edit ? (
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
                        unit: unitsQuery[field.food.name] || field.food.unit,
                      },
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Typography
          className={cn("text-center lg:col-span-3", {
            "text-edit": edit,
          })}
        >
          {edit
            ? "Ajoutez des ingrédients à votre recette"
            : "Pas d'ingrédients"}
        </Typography>
      )}
      <Button
        onClick={() => setOpen(true)}
        disabled={!edit}
        variant="edit"
        type="button"
        className={cn("transition-all duration-300 lg:col-start-3", {
          "pointer-events-none !h-0 translate-y-10 !opacity-0 lg:!h-8 lg:translate-x-40 lg:translate-y-0":
            !edit,
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
