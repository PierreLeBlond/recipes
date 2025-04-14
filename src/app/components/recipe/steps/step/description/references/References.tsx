import { RefObject, useRef, useState } from "react";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { getTypedReference } from "../getTypedReference";
import { ReferencesList } from "./ReferencesList";
import { ReferencesButton } from "./ReferencesButton";
import { getCaretCoordinates } from "../ContentEditable/getCaretCoordinates";

type ReferencesProps = {
  description: string;
  caretPosition: number;
  ingredients: Ingredient[];
  contentEditableRef: RefObject<HTMLDivElement | null>;
};

const removeLigature = (text: string) =>
  text.replace(/œ/g, "oe").replace(/æ/g, "ae");

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

  const referencedIngredients = ingredients.filter((ingredient) => {
    const normalizedIngredientName = removeLigature(
      ingredient.food.name.toLowerCase(),
    );

    const normalizedPartialReference = removeLigature(
      partialReference.toLowerCase(),
    );

    if (normalizedIngredientName === normalizedPartialReference) {
      return false;
    }

    return normalizedIngredientName.startsWith(normalizedPartialReference);
  });

  return referencedIngredients;
};

export function References({
  props: { description, caretPosition, ingredients, contentEditableRef },
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
  const ref = useRef<HTMLDivElement>(null);
  const caretCoordinates = contentEditableRef.current
    ? getCaretCoordinates(contentEditableRef.current)
    : null;
  const clientRect = ref.current?.getBoundingClientRect();
  const referencesListCoordinates =
    clientRect && caretCoordinates
      ? {
          x: caretCoordinates.x - clientRect.left,
          y: caretCoordinates.y - clientRect.top,
        }
      : null;

  const typedReference = getTypedReference(description, caretPosition);

  const referencedIngredients = getReferencedIngredients(
    typedReference,
    ingredients,
  );
  const [highlightedCursor, setHighlightedCursor] = useState<number>(0);

  const highlightedName =
    referencedIngredients[
      ((highlightedCursor % referencedIngredients.length) +
        referencedIngredients.length) %
        referencedIngredients.length
    ]?.food.name || null;

  const handleSelectedFoodReference = (foodName: string | null) => {
    if (!foodName) {
      return;
    }
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
    ["ArrowDown", () => setHighlightedCursor((value) => value + 1)],
    ["ArrowUp", () => setHighlightedCursor((value) => value - 1)],
    [
      "Tab",
      () => {
        handleSelectedFoodReference(highlightedName);
      },
    ],
    [
      "Enter",
      () => {
        handleSelectedFoodReference(highlightedName);
      },
    ],
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const action = inputActionMap.get(e.key);
    if (!action) {
      return;
    }
    // Keep focus on the contenteditable
    e.preventDefault();
    action();
  };

  return (
    <div
      className="relative flex w-full flex-col items-start gap-2 py-2"
      onKeyDown={handleKeyDown}
      role="presentation"
      ref={ref}
    >
      {typedReference !== null && referencesListCoordinates !== null && (
        <div
          className="absolute z-50 flex -translate-y-[100%] items-center"
          style={{
            top: `${referencesListCoordinates.y}px`,
            left: `${referencesListCoordinates.x}px`,
          }}
        >
          <ReferencesList
            props={{
              ingredients: referencedIngredients,
              highlightedName,
            }}
            onIngredientReferenceSelected={handleSelectedFoodReference}
          />
        </div>
      )}
      <ReferencesButton
        props={{ description, caretPosition }}
        onChangedDescription={handleChangedDescription}
      />
      {children}
    </div>
  );
}
