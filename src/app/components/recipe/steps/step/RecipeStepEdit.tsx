import { X } from "lucide-react";
import { FieldArrayWithId } from "react-hook-form";
import { Textarea } from "@/src/lib/material";
import { FormInputs } from "../../../../../lib/types/FormInputs";

type RecipeStepEditProps = {
  step: FieldArrayWithId<FormInputs, "steps", "id">;
  index: number;
  handleRemovedStep: () => void;
  handleUpdatedDescription: (description: string) => void;
};

export function RecipeStepEdit({
  props: { step, index, handleRemovedStep, handleUpdatedDescription },
}: {
  props: RecipeStepEditProps;
}) {
  return (
    <div className="flex min-h-24 w-full rounded-t-md rounded-bl-md border border-blue-gray-500 bg-gray-50 shadow-md">
      <div className="flex h-12 flex-col items-center justify-center rounded-br-md border-b border-r px-4 py-4 font-bold">
        {index + 1}
      </div>
      <div className="grid w-full p-2">
        <Textarea
          className="w-full resize-none overflow-hidden bg-gray-50 pl-2"
          value={step.description}
          onChange={(e) => handleUpdatedDescription(e.target.value)}
          onFocus={(e) => e.target.select()}
          color="blue-gray"
          label="Description"
          containerProps={{
            className: "col-start-1 col-end-2 row-start-1 row-end-2 ",
          }}
        />
        <div className="invisible col-start-1 col-end-2 row-start-1 row-end-2 text-ellipsis whitespace-pre-wrap text-nowrap">
          {step.description}
        </div>
      </div>
      <button
        aria-label="Supprimer l'étape"
        type="button"
        className="group flex h-12 items-center justify-center rounded-bl-md border-b border-l px-4 py-4"
        onClick={handleRemovedStep}
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
