export const getCaretCoordinates = (element: HTMLElement) => {
  if (!window.getSelection) {
    // Does not support IE8 and below
    return null;
  }

  if (document.activeElement !== element) {
    return null;
  }

  const selection = window.getSelection();

  if (!selection?.rangeCount) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.collapse(true);

  const rect = range.getBoundingClientRect();

  if (!rect) {
    return null;
  }

  return {
    x: rect.left || element.getBoundingClientRect().left,
    y: rect.top || element.getBoundingClientRect().top,
  };
};
