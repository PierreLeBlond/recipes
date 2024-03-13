import { X } from "lucide-react";
import { FieldArrayWithId } from "react-hook-form";
import { FormInputs } from "./FormInputs";

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
    <>
      <div className="flex min-h-12 w-full rounded-t-md rounded-bl-md border border-gray-900 bg-gray-50 shadow-fly">
        <div className="flex flex-col border-r border-gray-900 px-4 py-4">
          {index + 1}
        </div>
        <div className="flex w-full items-center justify-between p-2">
          <span className="relative flex h-full w-full rounded-md border-2 border-dashed border-gray-500 hover:cursor-pointer has-[:focus]:border-0">
            <textarea
              className="peer absolute h-full w-full cursor-pointer text-wrap rounded-md border-gray-900 bg-gray-50 pl-2 opacity-0 [appearance:textfield] focus:relative focus:cursor-vertical-text focus:border-2 focus:opacity-100 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={step.description}
              onChange={(e) => handleUpdatedDescription(e.target.value)}
              onFocus={(e) => e.target.select()}
            ></textarea>
            <span className="pl-2 peer-focus:hidden">{step.description}</span>
          </span>
        </div>
        <div
          className="group flex border-l border-gray-900 px-4 py-4 hover:cursor-pointer"
          onClick={handleRemovedStep}
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
    </>
  );
}
