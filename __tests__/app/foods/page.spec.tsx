import { AppRouter } from "@/src/server/api/root";
import { createTRPCMsw } from "msw-trpc";
import superjson from "superjson";
import { setupServer } from "msw/node";
import test, { expect } from "@playwright/test";
import { createFoodLabels } from "../components/food/createFoodLabels";

// from https://silverbirder.github.io/en-US/blog/contents/trpc-msw-mocking/
const trpcMsw = createTRPCMsw<AppRouter>({
  baseUrl: "http://localhost:3000/api/trpc",
  transformer: { input: superjson, output: superjson },
});

const server = setupServer(
  trpcMsw.food.create.mutation(async (food) => {
    return {
      ...food,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "2",
    };
  }),
  trpcMsw.food.list.query(async () => {
    return {
      foods: [
        {
          id: "1",
          name: "sucre",
          createdAt: new Date(),
          updatedAt: new Date(),
          unit: "GRAM",
          image: null,
          density: null,
          massPerPiece: null,
        },
      ],
      nextCursor: null,
    };
  }),
);

test.beforeAll(() => server.listen());
test.afterAll(() => server.close());

test("Should navigate to page", async ({ page }) => {
  await page.goto("http://host.docker.internal:3001/foods");

  console.log(await page.content());

  expect(await page.getByText(createFoodLabels.title).all()).toHaveLength(1);
});

test("Should create a food", async ({ page }) => {
  await page.goto("http://host.docker.internal:3001/foods");

  await page.getByLabel(createFoodLabels.nameInput).fill("sucre");
  await page.getByLabel(createFoodLabels.densityInputLabel).fill("1");

  await page.getByText(createFoodLabels.addButton).click();

  expect(
    await page.getByText("L'aliment 'sucre' a bien été ajouté.").all(),
  ).toHaveLength(1);
});
