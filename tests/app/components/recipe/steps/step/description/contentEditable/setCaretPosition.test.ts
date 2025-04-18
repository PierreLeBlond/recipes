import userEvent from "@testing-library/user-event";
import { getCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretPosition";
import { setCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/setCaretPosition";
import { test, expect, beforeEach } from "vitest";
import { clickOnContentEditableElement } from "@/tests/utils/clickOnContentEditableElement";

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
  expect(setCaretPosition).toBeDefined();
});

test("Should set the caret to the beginning of the content with position 0", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "Hello World";

  await clickOnContentEditableElement(user, element);
  setCaretPosition(element, 0);

  expect(getCaretPosition(element)).toEqual(0);
});

test("Should set the caret to the beginning of the content with negative position", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "Hello World";

  await clickOnContentEditableElement(user, element);
  setCaretPosition(element, -2);

  expect(getCaretPosition(element)).toEqual(0);
});

test("Should set the caret to given position", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "Hello World";

  await clickOnContentEditableElement(user, element);
  setCaretPosition(element, 5);
  await user.keyboard("!");

  expect(getCaretPosition(element)).toEqual(6);
  expect(element.innerHTML).toEqual("Hello! World");
});

test("Should set the caret with line breaks", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "Hello\nWorld";

  await clickOnContentEditableElement(user, element);
  setCaretPosition(element, 7);
  await user.keyboard("!");

  expect(getCaretPosition(element)).toEqual(8);
  expect(element.innerHTML).toEqual("Hello\nW!orld");
});

test("Should set the caret within nested element", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "<div>Hello <span>Wor<em>ld</em></span></div>";

  await clickOnContentEditableElement(user, element);
  setCaretPosition(element, 10);
  await user.keyboard("!");

  expect(getCaretPosition(element)).toEqual(11);
  expect(element).toHaveTextContent("Hello Worl!d");
});
