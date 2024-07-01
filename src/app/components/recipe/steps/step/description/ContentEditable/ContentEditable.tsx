import { RefObject, useEffect } from "react";
import { getCaretPosition } from "./getCaretPosition";
import { setCaretPosition } from "./setCaretPosition";
import { getOnCaretMoveEvents } from "./getCaretMoveEvents";

type ContentEditableProps = {
  formatedContent: string;
  caretPosition: number | null;
  ref: RefObject<HTMLDivElement>;
};

type ContentEditableInput = {
  onChangedContent: (_: {
    content: string;
    caretPosition: number | null;
  }) => void;
  props: ContentEditableProps;
};

export function ContentEditable({
  props: { formatedContent, caretPosition, ref },
  onChangedContent,
}: ContentEditableInput) {

  useEffect(() => {
    if (ref.current) {
      const newCaretPosition = caretPosition || getCaretPosition(ref.current);
      ref.current.innerHTML = formatedContent;
      if (ref.current === document.activeElement && newCaretPosition !== null) {
        setCaretPosition(ref.current, newCaretPosition);
      }
    }
  }, [formatedContent, caretPosition]);

  const handleChangedContent = () => {
    if (!onChangedContent || !ref.current) {
      return;
    }
    const newCaretPosition = getCaretPosition(ref.current);
    onChangedContent({
      content: ref.current.textContent || "",
      caretPosition: newCaretPosition,
    });
  };

  const { onclick, oninput, onkeydown } =
    getOnCaretMoveEvents(handleChangedContent);

  return (
    <div
      role="textbox"
      tabIndex={0}
      contentEditable="true"
      className="min-h-24 w-full whitespace-pre-wrap rounded-md border border-edit p-2 shadow-md focus:border-2 focus:outline-none"
      ref={ref}
      onClick={onclick}
      onInput={oninput}
      onKeyDown={onkeydown}
      onBlur={handleChangedContent}
      aria-label="Zone d'édition"
    />
  );
}
