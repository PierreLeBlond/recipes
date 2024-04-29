import { useState } from "react";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { ContentEditable } from "./ContentEditable/ContentEditable";
import { getFormatedDescription } from "./getFormatedDescription";
import { Description } from "./Description";
import { ViewMode } from "./viewMode/ViewMode";
import { References } from "./references/References";

type DescriptionInputProps = {
  description: string;
  ingredients: Ingredient[];
  plateRatio: number;
};

export function DescriptionEdit({
  props: { description, ingredients, plateRatio },
  onChangedDescription,
}: {
  props: DescriptionInputProps;
  onChangedDescription: (description: string) => void;
}) {
  const [caretPosition, setCaretPosition] = useState<number>(0);
  const [preview, setPreview] = useState<boolean>(false);

  const formatedDescription = getFormatedDescription(
    description,
    ingredients.map((ingredient) => ingredient.food.name),
  );

  const handleChangedDescription = (input: {
    description: string;
    caretPosition: number | null;
  }) => {
    setCaretPosition(input.caretPosition || 0);
    if (!onChangedDescription) {
      return;
    }
    onChangedDescription(input.description);
  };

  return (
    <ViewMode props={{ preview, setPreview }}>
      {preview ? (
        <Description props={{ description, ingredients, plateRatio }} />
      ) : (
        <References
          props={{ description, caretPosition, ingredients }}
          onChangedDescription={handleChangedDescription}
        >
          <ContentEditable
            onChangedContent={(content) =>
              handleChangedDescription({
                description: content.content,
                caretPosition: content.caretPosition,
              })
            }
            props={{ formatedContent: formatedDescription, caretPosition }}
          />
        </References>
      )}
    </ViewMode>
  );
}
