import { Units } from "@/prisma/generated/client/index.js";

const getRoundedQuantity = (quantity: number, nbChiffres: number) => {
  if (Number.isInteger(quantity)) {
    return quantity;
  }

  return +quantity.toFixed(nbChiffres);
};

const getFormatedMass = (quantity: number) => {
  if (quantity < 1000) {
    return `${Math.trunc(quantity)}g`;
  }
  return `${getRoundedQuantity(quantity / 1000, 3)}kg`;
};

const getFormatedVolume = (quantity: number) => {
  if (quantity < 1) {
    return `${getRoundedQuantity(quantity * 100, 1)}cl`;
  }
  return `${getRoundedQuantity(quantity, 3)}l`;
};

const formatedQuantityMap: { [Unit in Units]: (quantity: number) => string } = {
  [Units.PIECE]: (quantity: number) => `${getRoundedQuantity(quantity, 1)}`,
  [Units.GRAM]: (quantity: number) => getFormatedMass(quantity),
  [Units.LITER]: (quantity: number) => getFormatedVolume(quantity),
  [Units.PINCH]: (quantity: number) =>
    `${getRoundedQuantity(quantity, 1)} ${quantity > 1 ? "pincées" : "pincée"}`,
  [Units.TABLESPOON]: (quantity: number) =>
    `${getRoundedQuantity(quantity, 1)} ${quantity > 1 ? "cuillères" : "cuillère"} à soupe`,
  [Units.TEASPOON]: (quantity: number) =>
    `${getRoundedQuantity(quantity, 1)} ${quantity > 1 ? "cuillères" : "cuillère"} à café`,
  [Units.DROP]: (quantity: number) =>
    `${getRoundedQuantity(quantity, 1)} ${quantity > 1 ? "gouttes" : "goutte"}`,
};

export const getFormatedQuantity = (unit: Units, quantity: number) =>
  formatedQuantityMap[unit](quantity);
