import { RecipeIngredientEdit } from "@/src/app/components/recipe/ingredients/ingredient/RecipeIngredientEdit";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach } from "node:test";
import { expect, test } from "vitest";

afterEach(() => {
  cleanup();
});

const user = userEvent.setup();

const getComponent = () => {
  return render(
    <RecipeIngredientEdit
      props={{
        ingredient: {
          food: {
            name: "farine",
            density: null,
            massPerPiece: null,
            unit: "GRAM",
          },
          quantity: 200,
          unit: "GRAM",
        },
        handleRemovedIngredient: () => {},
        handleUpdatedQuantity: () => {},
        grabbed: false,
        grabbedPosition: 0,
      }}
      onGrab={() => {}}
    />,
  );
};

test("Should exists", () => {
  const component = getComponent();
  expect(component).toBeDefined();
});

test("Should have an input", () => {
  const component = getComponent();
  const input = component.queryByLabelText("farine");
  expect(input).not.toBeNull();
});

test("Should not loose focus when updating the input", async () => {
  const component = getComponent();
  const input = component.getByLabelText("farine");
  await user.click(input);
  await user.keyboard("1");
  expect(input).toHaveFocus();
});
