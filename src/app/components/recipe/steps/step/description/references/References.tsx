import { useState } from "react";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { getTypedReference } from "../getTypedReference";
import { ReferencesList } from "./ReferencesList";
import { ReferencesButton } from "./ReferencesButton";

type ReferencesProps = {
  description: string;
  caretPosition: number;
  ingredients: Ingredient[];
};

const removeLigature = (text: string) => text.replace(/œ/g, "oe").replace(/æ/g, "ae");

const getReferencedIngredients = (
  partialReference: string | null,
  ingredients: Ingredient[],
) => {
  if (partialReference === null) {
    return [];
  }

  if (partialReference === "") {
    return ingredients;
  }

  const referencedIngredients = ingredients.filter((ingredient) => removeLigature(ingredient.food.name.toLowerCase()).startsWith(
      partialReference.toLowerCase(),
    ));

  return referencedIngredients;
};

export function References({
  props: { description, caretPosition, ingredients },
  onChangedDescription,
  children,
}: {
  props: ReferencesProps;
  onChangedDescription: (_: {
    description: string;
    caretPosition: number;
  }) => void;
  children: React.ReactNode;
}) {
  const [selectedReference, setSelectedReference] = useState<string>(
    ingredients[0] ? ingredients[0].food.name : "",
  );

  const typedReference = getTypedReference(description, caretPosition);

  const referencedIngredients = getReferencedIngredients(
    typedReference,
    ingredients,
  );

  const handleSelectedFoodReference = (foodName: string) => {
    const descriptionStart = description
      .substring(0, caretPosition)
      .replace(new RegExp(`${typedReference}$`, "g"), `${foodName}`);

    const descriptionEnd = description.substring(caretPosition);

    const additionalSpace = descriptionEnd.startsWith(" ") ? "" : " ";

    const newDescription = descriptionStart + additionalSpace + descriptionEnd;
    if (!onChangedDescription) {
      return;
    }
    onChangedDescription({
      description: newDescription,
      caretPosition: descriptionStart.length + additionalSpace.length,
    });
  };

  const handleChangedDescription = (input: {
    description: string;
    caretPosition: number;
  }) => {
    if (!onChangedDescription) {
      return;
    }
    onChangedDescription(input);
  };

  const inputActionMap = new Map<string, () => void>([
    [
      "ArrowDown",
      () =>
        setSelectedReference(
          ingredients[
            (ingredients.findIndex(
              (ingredient) => ingredient.food.name === selectedReference,
            ) +
              1) %
              ingredients.length
          ]?.food.name || "",
        ),
    ],
    [
      "ArrowUp",
      () =>
        setSelectedReference(
          ingredients[
            (ingredients.findIndex(
              (ingredient) => ingredient.food.name === selectedReference,
            ) +
              ingredients.length -
              1) %
              ingredients.length
          ]?.food.name || "",
        ),
    ],
    [
      "Tab",
      () => {
        handleSelectedFoodReference(selectedReference);
      },
    ],
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const action = inputActionMap.get(e.key);
    if (!action) {
      return;
    }
    e.preventDefault();
    action();
  };

  return (
    <div
      className="flex w-full flex-col"
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div className="flex h-12 items-center">
        {typedReference !== null ? (
          <ReferencesList
            props={{
              ingredients: referencedIngredients,
              selectedReference,
            }}
            onIngredientReferenceSelected={handleSelectedFoodReference}
          />
        ) : (
          <ReferencesButton
            props={{ description, caretPosition }}
            onChangedDescription={handleChangedDescription}
          />
        )}
      </div>
      {children}
    </div>
  );
}
