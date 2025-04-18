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

test("Should add a span tag to words starting with # included in given references", () => {
  const content = "Hello #World";
  const references = ["World"];

  const result = getFormatedDescription(content, references, "font-bold");

  expect(result).toMatch(/Hello <span class="font-bold">#World<\/span>/);
});

test("Should include quantity percentage if provided", () => {
  const content = "Hello #World/50";
  const references = ["World"];

  const result = getFormatedDescription(content, references, "font-bold");

  expect(result).toMatch(/Hello <span class="font-bold">#World\/50<\/span>/);
});
