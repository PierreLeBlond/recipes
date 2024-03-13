import { Food, Ingredient, Step } from "@/prisma/generated/client";

export type FormInputs = {
  name: string;
  plateCount: number;
  image: string | null;
  ingredients: (Omit<
    Ingredient,
    "id" | "createdAt" | "updatedAt" | "recipeId" | "index"
  > & {
    food: Food;
  })[];
  steps: Omit<Step, "id" | "createdAt" | "updatedAt" | "recipeId" | "index">[];
};
