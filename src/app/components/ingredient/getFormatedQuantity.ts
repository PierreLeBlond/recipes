import { Units } from "@/prisma/generated/client";

const getFormatedMass = (quantity: number) => {
  if (quantity < 1000) {
    return `${quantity}g`;
  }
  return `${quantity / 1000}kg`;
};

const getFormatedVolume = (quantity: number) => {
  if (quantity < 1) {
    return `${quantity * 100}cl`;
  }
  return `${quantity}l`;
};

const formatedQuantityMap: { [Unit in Units]: (quantity: number) => string } = {
  [Units.PIECE]: (quantity: number) => `${quantity}`,
  [Units.GRAM]: (quantity: number) => getFormatedMass(quantity),
  [Units.LITER]: (quantity: number) => getFormatedVolume(quantity),
  [Units.PINCH]: (quantity: number) =>
    `${quantity} ${quantity > 1 ? "pincées" : "pincée"}`,
  [Units.TABLESPOON]: (quantity: number) =>
    `${quantity} ${quantity > 1 ? "cuillères" : "cuillère"} à soupe`,
  [Units.TEASPOON]: (quantity: number) =>
    `${quantity} ${quantity > 1 ? "cuillères" : "cuillère"} à café`,
  [Units.DROP]: (quantity: number) =>
    `${quantity} ${quantity > 1 ? "gouttes" : "goutte"}`,
};

export const getFormatedQuantity = (unit: Units, quantity: number) => {
  return formatedQuantityMap[unit](quantity);
};
