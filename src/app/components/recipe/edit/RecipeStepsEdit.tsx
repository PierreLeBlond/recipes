import { Control, useFieldArray } from "react-hook-form";
import { FormInputs } from "./FormInputs";
import { Button } from "@/src/lib/material";
import { RecipeStepEdit } from "./RecipeStepEdit";

type RecipeStepsEditProps = {
  control: Control<FormInputs>;
};

export const RecipeStepsEdit = ({
  props: { control },
}: {
  props: RecipeStepsEditProps;
}) => {
  const { fields, append, update, remove, move } = useFieldArray({
    control,
    name: "steps",
  });

  const handleAddStep = () => {
    append({ description: "" });
  };

  const handleRemovedStep = (index: number) => {
    remove(index);
  };

  const handleUpdatedDescription = (index: number, description: string) => {
    const field = fields[index];
    if (!field) {
      return;
    }
    update(index, { ...field, description });
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <h2 className="text-4xl font-bold tracking-tighter text-gray-800">
        ÉTAPES
      </h2>
      <div className="mb-4 w-full select-none overflow-y-auto">
        <ul className="relative flex list-inside flex-col gap-4 pb-4">
          {fields.map((field, index) => (
            <li key={index}>
              <RecipeStepEdit
                props={{
                  step: field,
                  index,
                  handleRemovedStep: () => handleRemovedStep(index),
                  handleUpdatedDescription: (description: string) =>
                    handleUpdatedDescription(index, description),
                }}
              ></RecipeStepEdit>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={() => handleAddStep()} variant="gradient">
        Ajouter une étape
      </Button>
    </div>
  );
};
