import { Food, Ingredient } from "@/prisma/generated/client";

export type IngredientInput = Omit<
  Ingredient,
  "id" | "createdAt" | "updatedAt" | "recipeId" | "index" | "foodName"
> & { food: Food };
