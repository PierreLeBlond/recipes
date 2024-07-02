import { ChangeEventHandler, FormEvent, FormEventHandler } from "react";

const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
const accentKeys = ["´", "`"];

export const getOnCaretMoveEvents = (onCaretMove: () => void) => ({
  onclick: onCaretMove,
  onkeydown: ({ key }: { key: string }) => {
    const keyPressedIsArrowKey = arrowKeys.includes(key);
    if (!keyPressedIsArrowKey) {
      return;
    }
    setTimeout(onCaretMove, 0);
  },
  oninput: (event: Event) => {
    const data = (event as unknown as { data: string }).data;
    if (data && accentKeys.includes(data)) {
      return;
    }
    onCaretMove();
  },
});
