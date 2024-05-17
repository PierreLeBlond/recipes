import { X } from "lucide-react";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { DescriptionEdit } from "./description/DescriptionEdit";
import { Step } from "@/src/lib/types/Step";

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
    <div className="grid min-h-24 w-full grid-cols-2 rounded-t-md rounded-bl-md border border-blue-gray-500 bg-gray-50 shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-br-md border-b border-r px-4 py-4 font-bold">
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
        className="group flex h-12 w-12 items-center justify-center justify-self-end rounded-bl-md border-b border-l px-4 py-4"
        onClick={onDeleteStep}
      >
        <X
          size={16}
          strokeWidth={5}
          className="text-gray-500 group-hover:cursor-pointer group-hover:text-red-500"
        />
      </button>
    </div>
  );
}
