import { X } from "lucide-react";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { Step } from "@/src/lib/types/Step";
import { DescriptionEdit } from "./description/DescriptionEdit";

type RecipeStepEditProps = {
  step: Step;
  index: number;
  ingredients: Ingredient[];
  plateRatio: number;
};

export function RecipeStepEdit({
  props: { step, index, ingredients, plateRatio },
  onChangedDescription,
  onDeleteStep,
}: {
  props: RecipeStepEditProps;
  onChangedDescription: (description: string) => void;
  onDeleteStep: () => void;
}) {
  return (
    <div className="grid min-h-24 w-full grid-cols-2 rounded-t-md rounded-bl-md border shadow-md">
      <div className="flex h-12 w-12 items-center justify-center px-4 py-4 font-bold">
        {index + 1}
      </div>

      <div className="col-span-2 row-start-2">
        <DescriptionEdit
          props={{ description: step.description, ingredients, plateRatio }}
          onChangedDescription={onChangedDescription}
        />
      </div>
      <button
        aria-label="Supprimer l'étape"
        type="button"
        className="group flex h-12 w-12 items-center justify-center justify-self-end px-4 py-4"
        onClick={onDeleteStep}
      >
        <X
          size={16}
          strokeWidth={5}
          className="text-error group-hover:cursor-pointer"
        />
      </button>
    </div>
  );
}
