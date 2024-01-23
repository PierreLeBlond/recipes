import { Food, Ingredient, Step, Units } from "@/prisma/generated/client";
import { getFormatedQuantity } from "../ingredient/getFormatedQuantity";
import parse from "html-react-parser";

type StepViewProps = {
  step: Step;
  ingredients: (Ingredient & { food: Food })[];
};

// TODO: Add all vowels
const vowels = ["a", "e", "i", "o", "u"];

const getAdjectif = (unit: Units, name: string) => {
  if (unit === Units.PIECE) {
    return "";
  }

  if (vowels.includes(name.charAt(0))) {
    return "d'";
  }

  return "de ";
};

export function StepView({ props }: { props: StepViewProps }) {
  const description = props.step.description.replace(
    /#([0-9]+)/g,
    (match: string) => {
      const index = parseInt(match.replace("#", ""));
      const ingredient = props.ingredients[index - 1];

      if (!ingredient) {
        return match;
      }

      return `<b>${getFormatedQuantity(ingredient.food.unit, ingredient.quantity)} ${getAdjectif(ingredient.food.unit, ingredient.food.name)}${ingredient.food.name}</b>`;
    },
  );

  return <>{parse(description)}</>;
}
