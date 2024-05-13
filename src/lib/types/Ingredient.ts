import { Units } from "@/prisma/generated/client/index.js";
import { Food } from "./Food";

export type Ingredient = {
  food: Food;
  quantity: number;
  unit: Units;
};
