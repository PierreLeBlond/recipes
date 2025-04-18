import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import { getCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretPosition";
import { clickOnContentEditableElement } from "@/tests/utils/clickOnContentEditableElement";

const getContentEditableElement = () => {
  const element = document.createElement("div");
  element.setAttribute("contenteditable", "true");
  document.body.appendChild(element);

  return element as HTMLElement;
};

const user = userEvent.setup();

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

  await clickOnContentEditableElement(user, element);

  expect(getCaretPosition(element)).toEqual(11);
});

test("Should return the caret position when moving with arrow keys", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "test";

  await clickOnContentEditableElement(user, element);
  await user.keyboard("{ArrowLeft}");

  expect(getCaretPosition(element)).toEqual(3);
});
