export const setCaretPosition = (element: HTMLElement, position: number) => {
  if (!window.getSelection) {
    // Does not support IE8 and below
    return;
  }

  if (document.activeElement !== element) {
    return;
  }

  const selection = window.getSelection();

  if (!selection) {
    return;
  }

  const range = document.createRange();

  // Ensure the position is within the bounds of the contenteditable div
  const normalizedPosition = Math.max(
    Math.min(position, element.textContent?.length || 0),
    0,
  );

  const searchNode = (
    node: Node,
    offset: number,
  ): { node: Node | null; offset: number } => {
    if (node.nodeType === Node.TEXT_NODE) {
      const length = node.textContent?.length || 0;
      if (length >= offset) {
        return { node, offset };
      }
      return { node: null, offset: offset - length };
    } 
      let newOffset = offset;
      for (let i = 0; i < node.childNodes.length; i += 1) {
        const childNode = node.childNodes[i] as Node;
        const result = searchNode(childNode, newOffset);
        if (result.node) {
          return result;
        }
        newOffset = result.offset;
      }
      return { node: null, offset: newOffset };
    
  };

  const { node, offset } = searchNode(element, normalizedPosition);

  if (!node) {
    range.selectNodeContents(element);
    range.collapse(false);
  } else {
    range.setStart(node, offset);
    range.collapse(true);
  }

  // Remove existing selections and select the new range
  selection.removeAllRanges();
  selection.addRange(range);
};
