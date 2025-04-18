import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { getCaretPosition } from "./getCaretPosition";
import { setCaretPosition } from "./setCaretPosition";
import { getOnCaretMoveEvents } from "./getCaretMoveEvents";

type ContentEditableProps = {
  formatedContent: string;
  caretPosition: number | null;
};

type ContentEditableInput = {
  onChangedContent: (_: {
    content: string;
    caretPosition: number | null;
  }) => void;
  props: ContentEditableProps;
};

export const ContentEditable = forwardRef(
  (
    {
      props: { formatedContent, caretPosition },
      onChangedContent,
    }: ContentEditableInput,
    ref,
  ) => {
    const contentEditableRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => contentEditableRef.current);
    useEffect(() => {
      if (contentEditableRef.current) {
        const newCaretPosition =
          caretPosition || getCaretPosition(contentEditableRef.current);
        contentEditableRef.current.innerHTML = formatedContent;
        if (
          contentEditableRef.current === document.activeElement &&
          newCaretPosition !== null
        ) {
          setCaretPosition(contentEditableRef.current, newCaretPosition);
        }
      }
    }, [formatedContent, caretPosition, ref]);

    const handleChangedContent = () => {
      if (!onChangedContent || !contentEditableRef.current) {
        return;
      }
      const newCaretPosition = getCaretPosition(contentEditableRef.current);
      onChangedContent({
        content: contentEditableRef.current.textContent || "",
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
        className="border-edit min-h-24 w-full overflow-hidden rounded-md border p-2 text-ellipsis whitespace-pre-wrap shadow-md focus:border-2 focus:outline-hidden"
        ref={contentEditableRef}
        onClick={onclick}
        onInput={({ nativeEvent }) => oninput(nativeEvent)}
        onKeyDown={onkeydown}
        onBlur={handleChangedContent}
        aria-label="Zone d'édition"
      />
    );
  },
);
