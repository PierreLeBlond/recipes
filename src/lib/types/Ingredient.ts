import { Food } from "./Food";
import { Unit } from "./Units";

export type Ingredient = {
  food: Food;
  quantity: number;
  unit: Unit;
};
