import { ReferencesList } from "@/src/app/components/recipe/steps/step/description/references/ReferencesList";
import { cleanup, render } from "@testing-library/react";
import { test, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

type Ingredient = {
  food: {
    name: string;
  };
};

type GetComponentInput = {
  ingredients?: Ingredient[];
  selectedReference?: string;
  onIngredientReferenceSelected?: (foodName: string) => void;
};

const defaultInput = {
  ingredients: [
    {
      food: {
        name: "pomme",
      },
    },
    {
      food: {
        name: "banane",
      },
    },
  ],
  selectedReference: "pomme",
  onIngredientReferenceSelected: () => {},
} as const satisfies GetComponentInput;

const getComponent = (input: GetComponentInput) => {
  return render(
    <ReferencesList
      props={{ ...defaultInput, ...input }}
      onIngredientReferenceSelected={
        input.onIngredientReferenceSelected ||
        defaultInput.onIngredientReferenceSelected
      }
    />,
  );
};

const user = userEvent.setup();

test("Should exists", () => {
  const component = getComponent({});
  expect(component).toBeDefined();
});

test("Should display given foods within a button", () => {
  const component = getComponent({});

  const appleButton = component.getByRole("button", { name: "pomme" });
  const bananaButton = component.getByRole("button", { name: "banane" });

  expect(appleButton).toBeDefined();
  expect(bananaButton).toBeDefined();
});

test("Should fire an event when a food is clicked", async () => {
  const onIngredientClickMock = vi.fn();
  const component = getComponent({
    onIngredientReferenceSelected: onIngredientClickMock,
  });

  await user.click(component.getByText("pomme"));

  expect(onIngredientClickMock.mock.calls).toHaveLength(1);
  expect(onIngredientClickMock.mock.calls[0][0]).toEqual("pomme");
});
