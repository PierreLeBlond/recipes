import { Units } from "@/prisma/generated/client";

const formatedUnitMap: { [Unit in Units]: (quantity: number) => string } = {
  [Units.PIECE]: (quantity: number) => `${quantity > 1 ? "pièces" : "pièce"}`,
  [Units.GRAM]: () => "g",
  [Units.LITER]: () => "l",
  [Units.PINCH]: (quantity: number) => `${quantity > 1 ? "pincées" : "pincée"}`,
  [Units.TABLESPOON]: (quantity: number) =>
    `${quantity > 1 ? "cuillères" : "cuillère"} à soupe`,
  [Units.TEASPOON]: (quantity: number) =>
    `${quantity > 1 ? "cuillères" : "cuillère"} à café`,
  [Units.DROP]: (quantity: number) => `${quantity > 1 ? "gouttes" : "goutte"}`,
};

export const getFormatedUnit = (unit: Units, quantity: number) => {
  return formatedUnitMap[unit](quantity);
};
