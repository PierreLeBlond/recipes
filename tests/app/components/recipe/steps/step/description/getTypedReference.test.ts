import { getTypedReference } from "@/src/app/components/recipe/steps/step/description/getTypedReference";
import { test, expect } from "vitest";

test("Should exists", () => {
  expect(getTypedReference).toBeDefined();
});

test("Should return null if no reference is being typed", () => {
  const content = "Hello World";

  const result = getTypedReference(content, 12);

  expect(result).toBeNull();
});

test("Should return an empty string if # has just been typed", () => {
  const content = "#";

  const result = getTypedReference(content, 1);

  expect(result).toEqual("");
});

test("Should return the reference being typed at the end of the string", () => {
  const content = "Hello #World";

  const result = getTypedReference(content, 12);

  expect(result).toEqual("World");
});

test("Should return the reference being typed somewhere in the string", () => {
  const content = "Hello #W, this is a test";

  const result = getTypedReference(content, 8);

  expect(result).toEqual("W");
});
