import { Units } from "@/prisma/generated/client";
import { Description } from "@/src/app/components/recipe/steps/step/description/Description";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

afterEach(() => {
  cleanup();
});

type GetComponentInput = {
  description?: string;
  ingredients?: {
    food: {
      name: string;
      density: number | null;
      massPerPiece: number | null;
      unit: Units;
    };
    quantity: number;
    unit: Units;
  }[];
  plateRatio?: number;
};

const defaultInput = {
  description: "Préchauffer le four à 180deg.",
  ingredients: [
    {
      food: { name: "farine", density: null, massPerPiece: null, unit: "GRAM" },
      quantity: 200,
      unit: "GRAM",
    },
  ],
  plateRatio: 1,
} as const satisfies GetComponentInput;

const getComponent = (input: GetComponentInput) => {
  return render(<Description props={{ ...defaultInput, ...input }} />);
};

test("Should exists", () => {
  const component = getComponent({});
  expect(component).toBeDefined();
});

describe("Display description", () => {
  test("Should display the description", () => {
    const component = getComponent({
      description: "Préchauffer le four à 180deg.",
    });

    const description = component.getByText("Préchauffer le four à 180deg.");

    expect(description).not.toBeNull();
  });

  test("Should transform references", () => {
    const component = getComponent({
      description: "Mettre #farine dans un bol.",
    });

    expect(component.baseElement).toHaveTextContent(
      "Mettre 200g de farine dans un bol.",
    );
  });
});
