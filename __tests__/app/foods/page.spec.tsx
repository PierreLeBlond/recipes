import test, { expect } from "@playwright/test";
import { createFoodLabels } from "../components/food/createFoodLabels";

test("Should navigate to page", async ({ page }) => {
  await page.goto("/foods");
  expect(await page.getByText(createFoodLabels.title).all()).toHaveLength(1);
});

test("Should create a food", async ({ page }) => {
  await page.goto("/foods");

  await page.getByLabel(createFoodLabels.nameInputLabel).fill("fruit du démon");
  await page.getByLabel(createFoodLabels.densityInputLabel).fill("1");

  const button = page.getByRole("button", {
    name: createFoodLabels.addButton,
  });
  await button.click();

  expect(
    await page.getByText("L'aliment 'fruit du démon' a bien été ajouté.").all(),
  ).toHaveLength(1);
});
