import { Step } from "@/prisma/generated/client/index.js";

export type StepInput = Omit<
  Step,
  "id" | "createdAt" | "updatedAt" | "recipeId" | "index"
>;
