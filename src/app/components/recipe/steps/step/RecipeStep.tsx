import { Units } from "@/prisma/generated/client";
import { getFormatedQuantity } from "../../../../../lib/quantity/getFormatedQuantity";
import parse from "html-react-parser";
import { getQuantityFromPlateAndUnit } from "@/src/lib/quantity/getQuantityFromPlateAndUnit";
import { useWatch } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { StepInput } from "@/src/lib/types/StepInput";

type RecipeStepProps = {
  step: StepInput;
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

export function RecipeStep({ props: { step } }: { props: RecipeStepProps }) {
  const queryState = useQueryState();
  const [ingredients, plateCount] = useWatch<
    FormInputs,
    ["ingredients", "plateCount"]
  >({ name: ["ingredients", "plateCount"] });

  const plateRatio = queryState.plateCount / plateCount;

  const description = step.description.replace(
    /#([0-9]+)/g,
    (match: string) => {
      const index = parseInt(match.replace("#", ""));
      const ingredient = ingredients[index - 1];

      if (!ingredient) {
        return match;
      }

      const unit =
        queryState.units[ingredient.foodName] || ingredient.food.unit;

      return `<b>${getFormatedQuantity(queryState.units[ingredient.foodName] || ingredient.food.unit, getQuantityFromPlateAndUnit({ ingredient, unit, plateRatio }))} ${getAdjectif(unit, ingredient.food.name)}${ingredient.food.name}</b>`;
    },
  );

  return <>{parse(description)}</>;
}
