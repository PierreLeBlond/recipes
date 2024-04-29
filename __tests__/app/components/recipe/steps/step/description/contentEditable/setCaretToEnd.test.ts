import userEvent from "@testing-library/user-event";
import { test, expect, beforeEach } from "vitest";
import { getCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretPosition";
import { setCaretToEnd } from "@/src/app/components/recipe/steps/step/description/ContentEditable/setCaretToEnd";
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

test("method exists", () => {
  expect(setCaretToEnd).toBeDefined();
});

test("Should set the caret to the end of the content", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "Hello World";

  setCaretToEnd(element);

  expect(getCaretPosition(element)).toEqual(11);
});

test("Should set the caret to the end of the content with nested elements", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "Hello <span>World</span>";

  setCaretToEnd(element);
  await user.keyboard("!");

  expect(getCaretPosition(element)).toEqual(12);
  expect(element.innerHTML).toEqual("Hello <span>World</span>!");
});
