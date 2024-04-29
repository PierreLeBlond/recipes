import { Ingredient } from "./Ingredient";
import { Step } from "./Step";

export type FormInputs = {
  name: string;
  plateCount: number;
  image: string | null;
  ingredients: Ingredient[];
  steps: Step[];
};
