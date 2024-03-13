import { getFormatedQuantity } from "@/src/lib/quantity/getFormatedQuantity";
import { getFormatedUnit } from "@/src/lib/quantity/getFormatedUnit";
import { cn } from "@/src/lib/utils";
import { Grip, X } from "lucide-react";
import { FieldArrayWithId } from "react-hook-form";
import { FormInputs } from "./FormInputs";
import { PointerEvent } from "react";

type RecipeIngredientEditProps = {
  ingredient: FieldArrayWithId<FormInputs, "ingredients", "id">;
  handleRemovedIngredient: () => void;
  handleUpdatedQuantity: (quantity: number) => void;
  grabbed: boolean;
  grabbedPosition: number;
};

export function RecipeIngredientEdit({
  props: {
    ingredient,
    handleRemovedIngredient,
    handleUpdatedQuantity,
    grabbed,
    grabbedPosition,
  },
  onGrab,
}: {
  props: RecipeIngredientEditProps;
  onGrab: (event: PointerEvent, id: string) => void;
}) {
  return (
    <>
      <div
        className={cn(
          "flex h-12 w-full rounded-t-md rounded-bl-md border border-gray-900 bg-gray-50 shadow-fly",
          {
            "absolute cursor-grabbing": grabbed,
          },
        )}
        style={{ top: grabbedPosition }}
      >
        <div
          className={cn(
            "group flex cursor-grab items-center border-r border-gray-900 px-4 py-2",
            {
              "cursor-grabbing": grabbed,
            },
          )}
          onPointerDown={(event: PointerEvent) => onGrab(event, ingredient.id)}
        >
          <Grip
            size={16}
            strokeWidth={5}
            className="text-gray-500 group-hover:text-gray-900"
          ></Grip>
        </div>
        <div className="flex w-full items-center justify-between text-ellipsis text-nowrap p-2">
          {ingredient.food.name}
          <span className="relative flex w-1/2 justify-end rounded-md border-2 border-dashed border-gray-500 font-bold hover:cursor-pointer has-[:focus]:border-0 sm:w-64">
            <input
              className="peer absolute mr-1 w-full cursor-pointer rounded-md border-gray-900 bg-gray-50 pr-1 text-right opacity-0 [appearance:textfield] focus:relative focus:cursor-vertical-text focus:border-2 focus:opacity-100 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={ingredient.quantity}
              type="number"
              step="0.1"
              onChange={(e) => handleUpdatedQuantity(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
            ></input>
            <span className="pr-2 peer-focus:hidden">
              {getFormatedQuantity(ingredient.food.unit, ingredient.quantity)}
            </span>
            <span className="hidden pr-2 peer-focus:block">
              {getFormatedUnit(ingredient.food.unit, ingredient.quantity)}
            </span>
          </span>
        </div>
        <div
          className="group flex items-center border-l border-gray-900 px-4 py-2 hover:cursor-pointer"
          onClick={handleRemovedIngredient}
        >
          <X
            size={16}
            strokeWidth={5}
            className={
              "text-gray-500 group-hover:cursor-pointer group-hover:text-red-500"
            }
          ></X>
        </div>
      </div>
      {grabbed && <div key="grabbed-item" className="h-12"></div>}
    </>
  );
}
