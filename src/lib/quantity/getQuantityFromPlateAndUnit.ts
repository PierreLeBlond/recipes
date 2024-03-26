import { Units } from "@/prisma/generated/client";
import { IngredientInput } from "../types/IngredientInput";

type ConvertInput = {
  ingredient: IngredientInput;
  plateRatio: number;
  unit: Units;
};

const convertMap: {
  [Unit in Units]: (data: {
    quantity: number;
    density: number | null;
    massPerPiece: number | null;
  }) => (to: Units) => number;
} = {
  [Units.GRAM]:
    ({ quantity, density }) =>
    (to: Units) => {
      if (to === Units.LITER) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity / density;
      }

      throw new Error("Not implemented");
    },
  [Units.LITER]:
    ({ quantity, density }) =>
    (to: Units) => {
      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * density;
      }

      throw new Error("Not implemented");
    },
  [Units.PIECE]:
    ({ quantity, massPerPiece }) =>
    (to: Units) => {
      if (to === Units.GRAM) {
        if (massPerPiece === null) {
          throw new Error("No mass per piece provided");
        }
        return quantity * massPerPiece;
      }

      throw new Error("Not implemented");
    },
  [Units.TEASPOON]:
    ({ quantity, density }) =>
    (to: Units) => {
      if (to === Units.LITER) {
        return quantity * 0.005;
      }

      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * 0.005 * density;
      }

      throw new Error("Not implemented");
    },
  [Units.TABLESPOON]:
    ({ quantity, density }) =>
    (to: Units) => {
      if (to === Units.LITER) {
        return quantity * 0.015;
      }

      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * 0.015 * density;
      }

      throw new Error("Not implemented");
    },
  [Units.PINCH]:
    ({ quantity, density }) =>
    (to: Units) => {
      if (to === Units.LITER) {
        return quantity * 0.0003;
      }
      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * 0.0003 * density;
      }
      throw new Error("Not implemented");
    },
  [Units.DROP]:
    ({ quantity, density }) =>
    (to: Units) => {
      if (to === Units.LITER) {
        return quantity * 0.00005;
      }
      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * 0.00005 * density;
      }
      throw new Error("Not implemented");
    },
};

export const getQuantityFromPlateAndUnit = ({
  ingredient,
  plateRatio,
  unit,
}: ConvertInput) => {
  if (ingredient.food.unit === unit) {
    return ingredient.quantity * plateRatio;
  }

  return convertMap[ingredient.food.unit]({
    quantity: ingredient.quantity * plateRatio,
    density: ingredient.food.density,
    massPerPiece: ingredient.food.massPerPiece,
  })(unit);
};
