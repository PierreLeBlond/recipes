import { getFormatedDescription } from "@/src/app/components/recipe/steps/step/description/getFormatedDescription";
import { test, expect } from "vitest";

test("method exists", () => {
  expect(getFormatedDescription).toBeDefined();
});

test("Should return the same content if no references are found", () => {
  const content = "Hello World";

  const result = getFormatedDescription(content);

  expect(result).toEqual(content);
});

test("Should add bold tag to words starting with #", () => {
  const content = "Hello #World";

  const result = getFormatedDescription(content);

  expect(result).toEqual("Hello <b>#World</b>");
});

test("Should also add tag to single #", async () => {
  const content = "Hello #";

  const result = getFormatedDescription(content);

  expect(result).toBe("Hello <b>#</b>");
});

test("Should add colorized span tag to words starting with # included in given references", () => {
  const content = "Hello #World";
  const references = ["World"];

  const result = getFormatedDescription(content, references);

  expect(result).toEqual(
    'Hello <b><span class="text-blue-gray-700">#World</span></b>',
  );
});
