import { Step } from "@/prisma/generated/client";

export type StepInput = Omit<
  Step,
  "id" | "createdAt" | "updatedAt" | "recipeId" | "index"
>;
