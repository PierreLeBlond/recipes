export const getFoodSearchInput = (description: string) => {
  const matches = description.match(/#(?<reference>\w+)$/);
  return matches?.groups?.reference || "";
};
