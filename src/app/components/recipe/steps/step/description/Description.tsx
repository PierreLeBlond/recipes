import { ContentEditable } from "./ContentEditable/ContentEditable";
import { getFormatedDescription } from "./getFormatedDescription";
import { getTypedReference } from "./getTypedReference";

type DescriptionInputProps = {
  description: string;
  caretPosition: number | null;
};

export const Description = ({
  props: { description, caretPosition },
  onChangedDescription,
  onTypedReference,
}: {
  props: DescriptionInputProps;
  onChangedDescription?: (description: string) => void;
  onTypedReference?: (_: {
    reference: string | null;
    caretPosition: number;
  }) => void;
}) => {
  const formatedDescription = getFormatedDescription(description);

  const handleTypedReference = (
    content: string,
    caretPosition: number | null,
  ) => {
    if (!onTypedReference || caretPosition === null) {
      return;
    }
    const reference = getTypedReference(content, caretPosition);
    onTypedReference({ reference, caretPosition });
  };

  const handleDescriptionChange = ({
    content,
    caretPosition,
  }: {
    content: string;
    caretPosition: number | null;
  }) => {
    handleTypedReference(content, caretPosition);

    if (!onChangedDescription) {
      return;
    }
    onChangedDescription(content);
  };

  return (
    <div className="grid w-full p-2">
      <ContentEditable
        onChangedContent={handleDescriptionChange}
        props={{ formatedContent: formatedDescription, caretPosition }}
      />
    </div>
  );
};
