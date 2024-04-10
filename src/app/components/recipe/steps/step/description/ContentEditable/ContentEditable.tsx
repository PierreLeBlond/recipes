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
      const newCaretPosition = caretPosition || getCaretPosition(ref.current);
      ref.current.innerHTML = formatedContent;
      if (ref.current === document.activeElement && newCaretPosition !== null) {
        setCaretPosition(ref.current, newCaretPosition);
      }
    }
  }, [formatedContent]);

  return (
    <div
      role="textbox"
      contentEditable="true"
      className="whitespace-pre-wrap"
      ref={ref}
      onFocus={() => {
        if (!ref.current) {
          return;
        }
        setCaretToEnd(ref.current);
      }}
      onInput={(e) => {
        if (!onChangedContent || !ref.current) {
          return;
        }

        onChangedContent({
          content: (e.target as HTMLDivElement).textContent || "",
          caretPosition: getCaretPosition(ref.current),
        });
      }}
    />
  );
};
