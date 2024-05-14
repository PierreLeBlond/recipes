export const Units = {
  GRAM: "GRAM",
  LITER: "LITER",
  PIECE: "PIECE",
  TEASPOON: "TEASPOON",
  TABLESPOON: "TABLESPOON",
  PINCH: "PINCH",
  DROP: "DROP",
} as const;

export type Unit = (typeof Units)[keyof typeof Units];
