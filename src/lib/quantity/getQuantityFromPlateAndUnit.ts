import { Units, Unit } from "../types/Units";

type ConvertInput = {
  ingredient: {
    food: {
      density: number | null;
      massPerPiece: number | null;
      unit: Unit;
    };
    quantity: number;
    unit: Unit;
  };
  plateRatio: number;
};

const convertMap: {
  [unit in Unit]: (data: {
    quantity: number;
    density: number | null;
    massPerPiece: number | null;
  }) => (to: Unit) => number;
} = {
  [Units.GRAM]:
    ({ quantity, density }) =>
    (to: Unit) => {
      if (to === Units.LITER) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity / (density * 1000);
      }

      throw new Error("Not implemented");
    },
  [Units.LITER]:
    ({ quantity, density }) =>
    (to: Unit) => {
      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * density * 1000;
      }

      throw new Error("Not implemented");
    },
  [Units.PIECE]:
    ({ quantity, massPerPiece }) =>
    (to: Unit) => {
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
    (to: Unit) => {
      if (to === Units.LITER) {
        return quantity * 0.005;
      }

      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * 0.005 * density * 1000;
      }

      throw new Error("Not implemented");
    },
  [Units.TABLESPOON]:
    ({ quantity, density }) =>
    (to: Unit) => {
      if (to === Units.LITER) {
        return quantity * 0.015;
      }

      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * 0.015 * density * 1000;
      }

      throw new Error("Not implemented");
    },
  [Units.PINCH]:
    ({ quantity, density }) =>
    (to: Unit) => {
      if (to === Units.LITER) {
        return quantity * 0.0003;
      }
      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * 0.0003 * density * 1000;
      }
      throw new Error("Not implemented");
    },
  [Units.DROP]:
    ({ quantity, density }) =>
    (to: Unit) => {
      if (to === Units.LITER) {
        return quantity * 0.00005;
      }
      if (to === Units.GRAM) {
        if (density === null) {
          throw new Error("No density provided");
        }
        return quantity * 0.00005 * density * 1000;
      }
      throw new Error("Not implemented");
    },
};

export const getQuantityFromPlateAndUnit = ({
  ingredient,
  plateRatio,
}: ConvertInput) => {
  if (ingredient.food.unit === ingredient.unit) {
    return ingredient.quantity * plateRatio;
  }

  return convertMap[ingredient.food.unit]({
    quantity: ingredient.quantity * plateRatio,
    density: ingredient.food.density,
    massPerPiece: ingredient.food.massPerPiece,
  })(ingredient.unit);
};
