import userEvent from "@testing-library/user-event";
import { test, expect, beforeEach } from "vitest";
import { getCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretPosition";

const getContentEditableElement = () => {
  const element = document.querySelector("[contenteditable]");
  if (!element) {
    throw new Error("Element not found");
  }
  return element as HTMLElement;
};

const user = userEvent.setup();

beforeEach(() => {
  const element = document.createElement("div");
  element.setAttribute("contenteditable", "true");
  document.body.appendChild(element);
});

test("Should exists", () => {
  expect(getCaretPosition).toBeDefined();
});

test("Should return null if element is not focused", () => {
  const element = getContentEditableElement();

  expect(getCaretPosition(element)).toBeNull();
});

test("Should return 0 if element has no content and is selected", async () => {
  const element = getContentEditableElement();

  await user.click(element);

  expect(getCaretPosition(element)).toEqual(0);
});

test("Should return the caret position within its content if focused", async () => {
  const element = getContentEditableElement();

  await user.click(element);
  await user.keyboard("test");

  expect(getCaretPosition(element)).toEqual(4);
});

test("Should return the caret position within nested content if focused", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "test <span>nested</span>";

  await user.click(element);

  expect(getCaretPosition(element)).toEqual(11);
});
