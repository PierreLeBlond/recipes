import { Unit, Units } from "../types/Units";
import { getFormatedUnit } from "./getFormatedUnit";

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

const formatedQuantityMap: { [unit in Unit]: (quantity: number) => string } = {
  [Units.PIECE]: (quantity: number) => `${getRoundedQuantity(quantity, 1)}`,
  [Units.GRAM]: (quantity: number) => getFormatedMass(quantity),
  [Units.LITER]: (quantity: number) => getFormatedVolume(quantity),
  [Units.PINCH]: (quantity: number) =>
    `${getRoundedQuantity(quantity, 1)} ${getFormatedUnit(Units.PINCH, quantity)}`,
  [Units.TABLESPOON]: (quantity: number) =>
    `${getRoundedQuantity(quantity, 1)} ${getFormatedUnit(Units.TABLESPOON, quantity)}`,
  [Units.TEASPOON]: (quantity: number) =>
    `${getRoundedQuantity(quantity, 1)} ${getFormatedUnit(Units.TEASPOON, quantity)}`,
  [Units.DROP]: (quantity: number) =>
    `${getRoundedQuantity(quantity, 1)} ${getFormatedUnit(Units.DROP, quantity)}`,
};

export const getFormatedQuantity = (unit: Unit, quantity: number) =>
  formatedQuantityMap[unit](quantity);
