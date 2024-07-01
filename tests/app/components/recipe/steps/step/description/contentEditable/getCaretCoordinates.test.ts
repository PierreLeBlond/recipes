import userEvent from "@testing-library/user-event";
import { test, expect, beforeEach, vi } from "vitest";
import { getCaretCoordinates } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretCoordinates";

Range.prototype.getBoundingClientRect = () => {
    return {
        left: 0,
        top: 0,
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        bottom: 0,
        right: 0,
        toJSON: () => ""
    };
  };

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
  expect(getCaretCoordinates).toBeDefined();
});

test("Should return null if element is not focused", () => {
  const element = getContentEditableElement();

  expect(getCaretCoordinates(element)).toBeNull();
});

test("Should return caret position within its container", async () => {
  const element = getContentEditableElement();

  await user.click(element);

  expect(getCaretCoordinates(element)).toEqual({x:0, y:0});
});