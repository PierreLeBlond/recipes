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
          "flex w-full rounded-t-md rounded-bl-md border bg-primary shadow-md",
          {
            "absolute cursor-grabbing": grabbed,
          },
        )}
        style={{ top: grabbedPosition }}
      >
        <button
          aria-label="Déplacer l'ingrédient"
          type="button"
          className={cn("group flex cursor-grab items-center border-r p-2", {
            "cursor-grabbing": grabbed,
          })}
          onPointerDown={(event: PointerEvent) => onGrab(event)}
        >
          <Grip size={16} strokeWidth={5} className="text-edit" />
        </button>
        <div className="flex w-full flex-wrap">
          <div className="flex grow items-center justify-center font-bold">
            {ingredient.food.name}
          </div>
          <div className="order-last w-full">
            <div className="flex w-full items-center justify-center p-2">
              <Input
                className="peer h-8 w-full cursor-pointer rounded-md pr-1 text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={ingredient.quantity}
                type="number"
                label="Quantité"
                step="0.1"
                onChange={(e) => handleUpdatedQuantity(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                variant="edit"
              />
              <span className="p-2 peer-focus:block">
                {getFormatedUnit(ingredient.food.unit, ingredient.quantity)}
              </span>
            </div>
          </div>
          <button
            aria-label="Supprimer l'ingrédient"
            type="button"
            className="group flex h-10 w-10 items-center justify-center"
            onClick={handleRemovedIngredient}
          >
            <X
              size={16}
              strokeWidth={5}
              className="text-error group-hover:cursor-pointer"
            />
          </button>
        </div>
      </div>
      {grabbed && <div key="grabbed-item" className="h-24" />}
    </>
  );
}
