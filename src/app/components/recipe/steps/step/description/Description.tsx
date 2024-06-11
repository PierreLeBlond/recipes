import { getFormatedQuantity } from "@/src/lib/quantity/getFormatedQuantity";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";
import { Ingredient } from "@/src/lib/types/Ingredient";
import { Unit, Units } from "@/src/lib/types/Units";
import parse from "html-react-parser";

type DescriptionProps = {
  description: string;
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

export function Description({
  props: { description, ingredients, plateRatio },
}: {
  props: DescriptionProps;
}) {
  const formatedDescription = ingredients
    .sort((a, b) => b.food.name.length - a.food.name.length)
    .reduce(
      (acc, ingredient) =>
        acc.replace(
          new RegExp(`(#${ingredient.food.name})`, "g"),
          `<b>${getFormatedQuantity(ingredient.unit, getQuantityFromPlateAndUnit({ ingredient, plateRatio }))} ${getAdjectif(ingredient.unit, ingredient.food.name)}${ingredient.food.name}</b>`,
        ),
      description,
    );

  return <div className="p-4">{parse(formatedDescription)}</div>;
}
