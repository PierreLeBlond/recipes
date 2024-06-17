import { Unit, Units } from "../types/Units";

const formatedUnitMap: { [unit in Unit]: (quantity: number) => string } = {
  [Units.PIECE]: (quantity: number) => `${quantity > 1 ? "pièces" : "pièce"}`,
  [Units.GRAM]: () => "g",
  [Units.LITER]: () => "l",
  [Units.PINCH]: (quantity: number) => `${quantity > 1 ? "pincées" : "pincée"}`,
  [Units.TABLESPOON]: () => "c. à s.",
  [Units.TEASPOON]: () => "c. à c.",
  [Units.DROP]: (quantity: number) => `${quantity > 1 ? "gouttes" : "goutte"}`,
};

export const getFormatedUnit = (unit: Unit, quantity: number) =>
  formatedUnitMap[unit](quantity);
