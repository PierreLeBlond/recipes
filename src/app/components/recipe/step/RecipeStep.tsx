import { Food, Ingredient, Step, Units } from "@/prisma/generated/client";
import { getFormatedQuantity } from "../../../../lib/quantity/getFormatedQuantity";
import parse from "html-react-parser";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";

type RecipeStepProps = {
  step: Step;
  recipeIngredients: {
    ingredient: Ingredient & { food: Food };
    localData: {
      plateRatio: number;
      unit: Units;
    };
  }[];
};

// TODO: Add all vowels
const vowels = ["a", "e", "i", "o", "u", "œ"];

const getAdjectif = (unit: Units, name: string) => {
  if (unit === Units.PIECE) {
    return "";
  }

  if (vowels.includes(name.charAt(0))) {
    return "d'";
  }

  return "de ";
};

export function RecipeStep({ props }: { props: RecipeStepProps }) {
  const description = props.step.description.replace(
    /#([0-9]+)/g,
    (match: string) => {
      const index = parseInt(match.replace("#", ""));
      const recipeIngredient = props.recipeIngredients[index - 1];

      if (!recipeIngredient) {
        return match;
      }

      return `<b>${getFormatedQuantity(recipeIngredient.localData.unit, getQuantityFromPlateAndUnit({ ingredient: recipeIngredient.ingredient, localData: recipeIngredient.localData }))} ${getAdjectif(recipeIngredient.localData.unit, recipeIngredient.ingredient.food.name)}${recipeIngredient.ingredient.food.name}</b>`;
    },
  );

  return <>{parse(description)}</>;
}
