import { KeyboardEvent } from "react";

type eventNames = "onclick" | "onkeydown";

const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

export const getOnCaretMoveEvents = (
  onCaretMove: () => void,
): Readonly<Record<eventNames, (e: KeyboardEvent) => void>> => ({
  onclick: onCaretMove,
  onkeydown: (e: KeyboardEvent) => {
    const keyPressedIsArrowKey = arrowKeys.includes(e.key);
    if (!keyPressedIsArrowKey) {
      return;
    }
    setTimeout(onCaretMove, 0);
  },
});
