import { X } from "lucide-react";
import { FieldArrayWithId } from "react-hook-form";
import { FormInputs } from "../../../../../lib/types/FormInputs";
import { Description } from "./description/Description";
import { FoodReferences } from "./foodReferences/FoodReferences";
import { useState } from "react";

type RecipeStepEditProps = {
  step: FieldArrayWithId<FormInputs, "steps", "id">;
  index: number;
  foods: { name: string }[];
};

const getReferencedfoods = (
  partialReference: string | null,
  foods: { name: string }[],
) => {
  if (partialReference === null) {
    return [];
  }

  if (partialReference === "") {
    return foods;
  }
  return foods.filter((food) =>
    food.name.toLowerCase().startsWith(partialReference.toLowerCase()),
  );
};

export function RecipeStepEdit({
  props: { step, index, foods },
  onChangedDescription,
  onDeleteStep,
}: {
  props: RecipeStepEditProps;
  onChangedDescription?: (description: string) => void;
  onDeleteStep?: () => void;
}) {
  const [typedReference, setTypedReference] = useState<string | null>(null);
  const [caretPosition, setCaretPosition] = useState<number>(0);

  const referencedFoods = getReferencedfoods(typedReference, foods);

  const handleTypedReference = ({
    reference,
    caretPosition,
  }: {
    reference: string | null;
    caretPosition: number;
  }) => {
    setTypedReference(reference);
    setCaretPosition(caretPosition);
  };

  const handleSelectedFoodReference = (foodName: string) => {
    const descriptionStart = step.description
      .substring(0, caretPosition)
      .replace(new RegExp(`${typedReference}$`, "g"), `${foodName} `);

    const descriptionEnd = step.description.substring(caretPosition);

    setCaretPosition(descriptionStart.length);

    const newDescription = descriptionStart + descriptionEnd;
    if (!onChangedDescription) {
      return;
    }
    onChangedDescription(newDescription);
  };

  return (
    <div className="flex min-h-24 w-full rounded-t-md rounded-bl-md border border-blue-gray-500 bg-gray-50 shadow-md">
      <div className="flex h-12 flex-col items-center justify-center rounded-br-md border-b border-r px-4 py-4 font-bold">
        {index + 1}
      </div>
      {typedReference !== null && (
        <FoodReferences
          props={{ foods: referencedFoods }}
          onFoodReferenceSelected={handleSelectedFoodReference}
        ></FoodReferences>
      )}
      <Description
        props={{ description: step.description, caretPosition }}
        onChangedDescription={onChangedDescription}
        onTypedReference={handleTypedReference}
      ></Description>
      <button
        aria-label="Supprimer l'étape"
        type="button"
        className="group flex h-12 items-center justify-center rounded-bl-md border-b border-l px-4 py-4"
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
