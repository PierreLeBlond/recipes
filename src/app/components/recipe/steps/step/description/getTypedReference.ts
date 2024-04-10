export const getTypedReference = (content: string, caretPosition: number) => {
  const referenceStart = content.substring(0, caretPosition).match(/#(\w*)$/);

  if (!referenceStart) {
    return null;
  }

  const [, referenceStartValue] = referenceStart;
  const referenceEnd = content.substring(caretPosition).match(/^(\w+)/);

  if (!referenceEnd) {
    return `${referenceStartValue}`;
  }

  const [, referenceEndValue] = referenceEnd;
  return `${referenceStartValue}${referenceEndValue}`;
};
