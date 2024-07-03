import { useRef, useState } from "react";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { Tabs, TabsList, TabsTrigger } from "@/src/app/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { ContentEditable } from "./ContentEditable/ContentEditable";
import { getFormatedDescription } from "./getFormatedDescription";
import { Description } from "./Description";
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
  const contentEditableRef = useRef<HTMLDivElement>(null);

  // Using this kind of proxy should improve performance,
  // by not rerendering the full form when the description changes
  const [currentDescription, setCurrentDescription] =
    useState<string>(description);
  const formatedDescription = getFormatedDescription(
    currentDescription,
    ingredients.map((ingredient) => ingredient.food.name),
    "text-edit font-bold",
  );

  const handleChangedDescription = (input: {
    description: string;
    caretPosition: number | null;
  }) => {
    setCaretPosition(input.caretPosition || 0);
    setCurrentDescription(input.description);
    if (!onChangedDescription) {
      return;
    }
    onChangedDescription(input.description);
  };

  return (
    <Tabs defaultValue="edit" className="flex flex-col justify-center p-2">
      <TabsList>
        <TabsTrigger value="edit">Édition</TabsTrigger>
        <TabsTrigger value="view">Prévisualisation</TabsTrigger>
      </TabsList>
      <TabsContent value="edit">
        <References
          props={{
            description: currentDescription,
            caretPosition,
            ingredients,
            contentEditableRef,
          }}
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
            ref={contentEditableRef}
          />
        </References>
      </TabsContent>
      <TabsContent value="view">
        <Description
          props={{ description: currentDescription, ingredients, plateRatio }}
        />
      </TabsContent>
    </Tabs>
  );
}
