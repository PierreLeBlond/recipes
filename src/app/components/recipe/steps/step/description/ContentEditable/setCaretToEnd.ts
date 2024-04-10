export const setCaretToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  const selection = window.getSelection();

  if (!selection) {
    return;
  }

  selection.removeAllRanges();
  selection.addRange(range);
  element.focus();
};
