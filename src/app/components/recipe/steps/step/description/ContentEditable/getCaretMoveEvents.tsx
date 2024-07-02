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
  oninput: ({ nativeEvent: { data } }: { nativeEvent: InputEvent }) => {
    if (data && accentKeys.includes(data)) {
      return;
    }
    onCaretMove();
  },
});
