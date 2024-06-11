export const getFormatedDescription = (
  description: string,
  references: string[] = [],
  className: string = "",
) => references
    .sort((a, b) => b.length - a.length)
    .reduce(
      (acc, reference) =>
        acc.replace(
          new RegExp(`(#${reference})`, "g"),
          `<span class="${className}">$1</span>`,
        ),
      description,
    );
