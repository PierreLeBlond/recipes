import userEvent from "@testing-library/user-event";
import { test, expect, beforeEach } from "vitest";
import { getCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretPosition";
import { setCaretToEnd } from "@/src/app/components/recipe/steps/step/description/ContentEditable/setCaretToEnd";
import { clickOnContentEditableElement } from "@/tests/utils/clickOnContentEditableElement";
const getContentEditableElement = () => {
  const element = document.createElement("div");
  element.setAttribute("contenteditable", "true");
  document.body.appendChild(element);
  return element as HTMLElement;
};

const user = userEvent.setup();

test("method exists", () => {
  expect(setCaretToEnd).toBeDefined();
});

test("Should set the caret to the end of the content", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "Hello World";

  await clickOnContentEditableElement(user, element);

  expect(getCaretPosition(element)).toEqual(11);
});

test("Should set the caret to the end of the content with nested elements", async () => {
  const element = getContentEditableElement();
  element.innerHTML = "Hello <span>World</span>";

  await clickOnContentEditableElement(user, element);
  await user.keyboard("!");

  expect(getCaretPosition(element)).toEqual(12);
  expect(element.innerHTML).toEqual("Hello <span>World</span>!");
});
