export const getFormatedDescription = (
  description: string,
  references: string[] = [],
) => {
  const boldedDescription = description.replace(/(#\w*)/g, "<b>$1</b>");
  return references.reduce((acc, reference) => acc.replace(
      new RegExp(`(#${reference})`, "g"),
      `<span class="text-blue-gray-700">$1</span>`,
    ), boldedDescription);
};
