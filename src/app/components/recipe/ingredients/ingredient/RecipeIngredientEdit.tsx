import { getFormatedUnit } from "@/src/lib/quantity/getFormatedUnit";
import { cn } from "@/src/lib/utils";
import { Grip, X } from "lucide-react";
import { PointerEvent } from "react";
import { Input } from "@/src/lib/material";
import { Ingredient } from "@/src/lib/types/Ingredient";

type RecipeIngredientEditProps = {
  ingredient: Ingredient;
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
  onGrab: (event: PointerEvent) => void;
}) {
  return (
    <>
      <div
        className={cn(
          "flex h-12 w-full rounded-t-md rounded-bl-md border border-blue-gray-500 bg-gray-50 shadow-md",
          {
            "absolute cursor-grabbing": grabbed,
          },
        )}
        style={{ top: grabbedPosition }}
      >
        <button
          aria-label="Déplacer l'ingrédient"
          type="button"
          className={cn(
            "group flex cursor-grab items-center border-r px-4 py-2",
            {
              "cursor-grabbing": grabbed,
            },
          )}
          onPointerDown={(event: PointerEvent) => onGrab(event)}
        >
          <Grip
            size={16}
            strokeWidth={5}
            className="text-gray-500 group-hover:text-gray-900"
          />
        </button>
        <div className="flex w-full items-center justify-between text-ellipsis text-nowrap p-2">
          {ingredient.food.name}
          <span className="relative flex w-1/2 items-center justify-end rounded-md font-bold sm:w-64">
            <Input
              crossOrigin=""
              className="peer w-full cursor-pointer rounded-md bg-gray-50 pr-1 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={ingredient.quantity}
              type="number"
              label="Quantité"
              color="blue-gray"
              step="0.1"
              labelProps={{
                htmlFor: "quantity-input",
              }}
              id="quantity-input"
              containerProps={{
                className: "h-8",
              }}
              onChange={(e) => handleUpdatedQuantity(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
            />
            <span className="p-2 peer-focus:block">
              {getFormatedUnit(ingredient.food.unit, ingredient.quantity)}
            </span>
          </span>
        </div>
        <button
          aria-label="Supprimer l'ingrédient"
          type="button"
          className="group flex items-center border-l px-4 py-2"
          onClick={handleRemovedIngredient}
        >
          <X
            size={16}
            strokeWidth={5}
            className="text-gray-500 group-hover:cursor-pointer group-hover:text-red-500"
          />
        </button>
      </div>
      {grabbed && <div key="grabbed-item" className="h-12" />}
    </>
  );
}
