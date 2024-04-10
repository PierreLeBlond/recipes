import { getFoodSearchInput } from "@/src/lib/steps/getFoodSearchInput";
import { test, expect } from "vitest";

test("should return empty string on string without #", () => {
  expect(getFoodSearchInput("test")).toBe("");
});

test("should return string after #", () => {
  expect(getFoodSearchInput("#test")).toBe("test");
});

test("should return word after # only if nothing after", () => {
  expect(getFoodSearchInput("#test test")).toBe("");
  expect(getFoodSearchInput("#test\ntest")).toBe("");
});

test("should return word after # even if its not at the start", () => {
  expect(getFoodSearchInput("test #test")).toBe("test");
});

test("should only return the last word after #", () => {
  expect(getFoodSearchInput("test #test1 #test2")).toBe("test2");
});
