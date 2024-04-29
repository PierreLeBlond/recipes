import { Units } from "@/prisma/generated/client";
import { getFormatedQuantity } from "@/src/lib/quantity/getFormatedQuantity";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";
import { Ingredient } from "@/src/lib/types/Ingredient";
import parse from "html-react-parser";

type DescriptionProps = {
  description: string;
  ingredients: Ingredient[];
  plateRatio: number;
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

export function Description({
  props: { description, ingredients, plateRatio },
}: {
  props: DescriptionProps;
}) {
  const formatedDescription = description.replace(/#\w+/g, (match: string) => {
    const ingredient = ingredients.find(
      ({ food: { name } }) => `#${name}` === match,
    );

    if (!ingredient) {
      return match;
    }

    return `<b>${getFormatedQuantity(ingredient.unit, getQuantityFromPlateAndUnit({ ingredient, plateRatio }))} ${getAdjectif(ingredient.unit, ingredient.food.name)}${ingredient.food.name}</b>`;
  });

  return <div className="p-4">{parse(formatedDescription)}</div>;
}
