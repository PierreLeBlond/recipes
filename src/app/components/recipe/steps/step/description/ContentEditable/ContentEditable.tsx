import { useEffect, useRef } from "react";
import { getCaretPosition } from "./getCaretPosition";
import { setCaretPosition } from "./setCaretPosition";
import { setCaretToEnd } from "./setCaretToEnd";

type ContentEditableProps = {
  formatedContent: string;
  caretPosition: number | null;
};

type ContentEditableInput = {
  onChangedContent?: (_: {
    content: string;
    caretPosition: number | null;
  }) => void;
  props: ContentEditableProps;
};

export const ContentEditable = ({
  props: { formatedContent, caretPosition },
  onChangedContent: onChangedContent,
}: ContentEditableInput) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      console.log({ caretPosition });
      const newCaretPosition = caretPosition || getCaretPosition(ref.current);
      ref.current.innerHTML = formatedContent;
      if (ref.current === document.activeElement && newCaretPosition !== null) {
        setCaretPosition(ref.current, newCaretPosition);
      }
    }
  }, [formatedContent]);

  const handleChangedContent = () => {
    if (!onChangedContent || !ref.current) {
      return;
    }
    const caretPosition = getCaretPosition(ref.current);
    onChangedContent({
      content: ref.current.textContent || "",
      caretPosition,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keyMap = {};
  };

  return (
    <div
      role="textbox"
      contentEditable="true"
      className="whitespace-pre-wrap"
      ref={ref}
      onClick={handleChangedContent}
      onInput={handleChangedContent}
      onKeyDown={handleChangedContent}
    />
  );
};
