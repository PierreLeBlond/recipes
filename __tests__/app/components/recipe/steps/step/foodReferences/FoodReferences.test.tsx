import { FoodReferences } from "@/src/app/components/recipe/steps/step/foodReferences/FoodReferences";
import { cleanup, render } from "@testing-library/react";
import { test, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

const foods = [
  {
    name: "Apple",
  },
  {
    name: "Banana",
  },
];

const user = userEvent.setup();

test("Should exists", () => {
  const component = render(<FoodReferences props={{ foods: [] }} />);
  expect(component).toBeDefined();
});

test("Should display given foods within a button", () => {
  const component = render(<FoodReferences props={{ foods }} />);

  const appleButton = component.getByText("Apple");
  const bananaButton = component.getByText("Banana");

  expect(appleButton).toBeDefined();
  expect(appleButton).toHaveAttribute("role", "button");
  expect(bananaButton).toBeDefined();
  expect(bananaButton).toHaveAttribute("role", "button");
});

test("Should display a message if no foods are given", () => {
  const component = render(<FoodReferences props={{ foods: [] }} />);
  expect(component.getByText("Pas d'ingrédients correspondants")).toBeDefined();
});

test("Should fire an event when a food is clicked", async () => {
  const onFoodClickMock = vi.fn();
  const component = render(
    <FoodReferences
      props={{ foods }}
      onFoodReferenceSelected={onFoodClickMock}
    />,
  );

  await user.click(component.getByText("Apple"));

  expect(onFoodClickMock.mock.calls).toHaveLength(1);
  expect(onFoodClickMock.mock.calls[0][0]).toEqual("Apple");
});
