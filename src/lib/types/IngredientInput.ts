import { Food, Ingredient } from "@/prisma/generated/client/index.js";

export type IngredientInput = Omit<
  Ingredient,
  "id" | "createdAt" | "updatedAt" | "recipeId" | "index" | "foodName"
> & { food: Food };
