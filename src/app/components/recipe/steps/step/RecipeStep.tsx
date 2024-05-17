import parse from "html-react-parser";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";
import { Unit, Units } from "@/src/lib/types/Units";
import { Step } from "@/src/lib/types/Step";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { getFormatedQuantity } from "../../../../../lib/quantity/getFormatedQuantity";

type RecipeStepProps = {
  step: Step;
  ingredients: Ingredient[];
  plateRatio: number;
};

// TODO: Add all vowels
const vowels = ["a", "e", "i", "o", "u", "œ"];

const getAdjectif = (unit: Unit, name: string) => {
  if (unit === Units.PIECE) {
    return "";
  }

  if (vowels.includes(name.charAt(0))) {
    return "d'";
  }

  return "de ";
};

export function RecipeStep({
  props: { step, ingredients, plateRatio },
}: {
  props: RecipeStepProps;
}) {
  const description = step.description.replace(
    /#([0-9]+)/g,
    (match: string) => {
      const index = parseInt(match.replace("#", ""), 10);
      const ingredient = ingredients[index - 1];

      if (!ingredient) {
        return match;
      }

      return `<b>${getFormatedQuantity(ingredient.unit, getQuantityFromPlateAndUnit({ ingredient, plateRatio }))} ${getAdjectif(ingredient.unit, ingredient.food.name)}${ingredient.food.name}</b>`;
    },
  );

  return <>{parse(description)}</>;
}
