export const getFormatedDescription = (
  description: string,
  references: string[] = [],
) => {
  const boldedDescription = description.replace(/#(\w+)/g, "<b>#$1</b>");
  return references.reduce((acc, reference) => {
    return acc.replace(
      new RegExp(`#(${reference})`, "g"),
      `<p className="text-blue-gray-700">#$1</p>`,
    );
  }, boldedDescription);
};
