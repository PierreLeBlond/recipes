import { Food, PrismaClient, Units } from "@/prisma/generated/client/index.js";
import { foodRouter } from "@/src/server/api/routers/food";
import { t } from "@/src/server/api/trpc";
import { describe, expect, it, test } from "vitest";
import { mockDeep } from "vitest-mock-extended";

const mockDb = mockDeep<PrismaClient>();

const foods = [
  {
    name: "farine",
    density: 0.5,
    massPerPiece: null,
    unit: "GRAM",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "1",
  },
] as const satisfies Food[];

mockDb.food.findMany.mockResolvedValue(foods);
mockDb.food.create.mockResolvedValue(foods[0]);
mockDb.food.delete.mockResolvedValue(foods[0]);

const createCaller = t.createCallerFactory(foodRouter);
const caller = createCaller({
  db: mockDb,
  session: null,
  headers: new Headers(),
});

test("Should exists", () => {
  expect(foodRouter).toBeDefined();
});

test("Should list foods", async () => {
  const input = { search: "apple", limit: 10, cursor: "123" };
  const result = await caller.list(input);

  expect(result).toEqual({ foods, nextCursor: null });
});

describe("create food", () => {
  it("Should throw if a non-admin user tries to create a food", async () => {
    const caller = createCaller({
      db: mockDb,
      session: { user: { role: "USER", id: "" }, expires: "" },
      headers: new Headers(),
    });

    const input = {
      name: "farine",
      density: 0.5,
      massPerPiece: null,
      unit: Units.GRAM,
      image: null,
    };

    await expect(caller.create(input)).rejects.toThrowError();
  });

  it("Should create food if user is admin", async () => {
    const caller = createCaller({
      db: mockDb,
      session: { user: { role: "ADMIN", id: "" }, expires: "" },
      headers: new Headers(),
    });
    const input = {
      name: "farine",
      density: 0.5,
      massPerPiece: null,
      unit: Units.GRAM,
      image: null,
    };
    const result = await caller.create(input);

    expect(result).toEqual(foods[0]);
  });
});

describe("delete food", () => {
  it("Should throw if a non-admin user tries to delete a food", async () => {
    const caller = createCaller({
      db: mockDb,
      session: { user: { role: "USER", id: "" }, expires: "" },
      headers: new Headers(),
    });

    await expect(caller.delete({ id: "1" })).rejects.toThrowError();
  });

  it("Should delete food if user is admin", async () => {
    const caller = createCaller({
      db: mockDb,
      session: { user: { role: "ADMIN", id: "" }, expires: "" },
      headers: new Headers(),
    });
    const result = await caller.delete({ id: "1" });

    expect(result).toEqual(foods[0]);
  });
});
