export const getCaretPosition = (element: HTMLElement) => {
  if (!window.getSelection) {
    // Does not support IE8 and below
    return null;
  }

  if (document.activeElement !== element) {
    return null;
  }

  if (element.textContent === "") {
    return 0;
  }

  const selection = window.getSelection();

  if (!selection?.rangeCount) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  const caretPosition = preCaretRange.toString().length;

  return caretPosition;
};
