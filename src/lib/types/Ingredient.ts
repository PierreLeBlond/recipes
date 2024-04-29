import { Units } from "@/prisma/generated/client";
import { Food } from "./Food";

export type Ingredient = {
  food: Food;
  quantity: number;
  unit: Units;
};
