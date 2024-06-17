import { getFormatedUnit } from "@/src/lib/quantity/getFormatedUnit";
import { cn } from "@/src/lib/utils";
import { Grip, X } from "lucide-react";
import { PointerEvent } from "react";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { Input } from "../../../ui/input";

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
          "flex w-full max-w-96 rounded-t-md rounded-bl-md border bg-primary shadow-md",
          {
            "absolute z-20 cursor-grabbing": grabbed,
          },
        )}
        style={{ top: grabbedPosition }}
      >
        <button
          aria-label="Déplacer l'ingrédient"
          type="button"
          className={cn(
            "group flex cursor-grab touch-none items-center border-r p-2",
            {
              "cursor-grabbing": grabbed,
            },
          )}
          onPointerDown={(event: PointerEvent) => onGrab(event)}
        >
          <Grip size={16} strokeWidth={5} className="text-edit" />
        </button>
        <div className="flex grow items-center justify-center px-2 pt-2">
          <Input
            className="peer h-8 cursor-pointer rounded-md pr-1 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={ingredient.quantity}
            type="number"
            label={ingredient.food.name}
            step="0.1"
            onChange={(e) => handleUpdatedQuantity(Number(e.target.value))}
            onFocus={(e) => e.target.select()}
            variant="edit"
          />
          <span className="text-nowrap p-2 peer-focus:block">
            {getFormatedUnit(ingredient.food.unit, ingredient.quantity)}
          </span>
        </div>
        <button
          aria-label="Supprimer l'ingrédient"
          type="button"
          className="group flex items-center border-l p-1 "
          onClick={handleRemovedIngredient}
        >
          <X
            size={24}
            strokeWidth={5}
            className="rounded-lg p-1 text-error group-hover:cursor-pointer group-hover:bg-error/20"
          />
        </button>
      </div>
      {grabbed && (
        <div key="grabbed-item" className="w-full border border-transparent">
          <div className="h-12" />
        </div>
      )}
    </>
  );
}
