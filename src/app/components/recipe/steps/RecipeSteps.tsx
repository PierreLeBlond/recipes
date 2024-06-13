import { UtensilsCrossed } from "lucide-react";
import { useFieldArray, useWatch } from "react-hook-form";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { cn } from "@/src/lib/utils";
import { RecipeStepEdit } from "./step/RecipeStepEdit";
import { Description } from "./step/description/Description";
import { Button } from "../../ui/button";
import { Typography } from "../../ui/typography";

export function RecipeSteps() {
  const queryState = useQueryState();

  const { fields, append, remove, update } = useFieldArray<FormInputs, "steps">(
    {
      name: "steps",
    },
  );

  const ingredients = useWatch<FormInputs, "ingredients">({
    name: "ingredients",
  }).map((ingredient) => ({
    ...ingredient,
    unit: queryState.units[ingredient.food.name] || ingredient.food.unit,
  }));

  const plateCount = useWatch<FormInputs, "plateCount">({
    name: "plateCount",
  });

  const plateRatio = queryState.plateCount / plateCount;

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

    update(index, { description });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Typography variant="h2">ÉTAPES</Typography>
      {fields.length !== 0 ? (
        <ul className="relative flex list-inside flex-col gap-4 lg:col-span-3">
          {fields.map((field, index) => (
            // Uses index as key cause react-hook-form changes the field id each time its updated, resulting in focus lost
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              {queryState.edit ? (
                <RecipeStepEdit
                  props={{
                    step: field,
                    index,
                    ingredients,
                    plateRatio,
                  }}
                  onChangedDescription={(description) =>
                    handleUpdatedDescription(index, description)
                  }
                  onDeleteStep={() => handleRemovedStep(index)}
                />
              ) : (
                <Description
                  props={{
                    description: field.description,
                    ingredients,
                    plateRatio,
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Typography
          className={cn("text-center lg:col-span-3", {
            "text-edit": queryState.edit,
          })}
        >
          {queryState.edit
            ? "Ajoutez des étapes à votre recette"
            : "Pas d'étapes"}
        </Typography>
      )}
      <Button
        onClick={() => handleAddStep()}
        disabled={!queryState.edit}
        variant="edit"
        className={cn("transition-all duration-300 lg:col-start-3", {
          "pointer-events-none !h-0 translate-y-10 !opacity-0 lg:!h-8 lg:translate-x-40 lg:translate-y-0":
            !queryState.edit,
        })}
      >
        AJOUTER UNE ÉTAPE
      </Button>
      <div className="flex w-full justify-center lg:col-span-3">
        <UtensilsCrossed />
      </div>
    </div>
  );
}
