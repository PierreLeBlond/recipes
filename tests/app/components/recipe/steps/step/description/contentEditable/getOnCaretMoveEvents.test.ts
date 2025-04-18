import { getOnCaretMoveEvents } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretMoveEvents";
import { getCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretPosition";
import { clickOnContentEditableElement } from "@/tests/utils/clickOnContentEditableElement";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi, Mock } from "vitest";

test("Should exists", () => {
  expect(getOnCaretMoveEvents).toBeDefined();
});

const user = userEvent.setup();

const getElement = (onCaretMove: Mock) => {
  const element = document.createElement("div");
  element.setAttribute("contenteditable", "true");
  document.body.appendChild(element);

  const { onclick, oninput, onkeydown } = getOnCaretMoveEvents(onCaretMove);

  element.onclick = onclick;
  element.oninput = oninput;
  element.onkeydown = onkeydown;

  return element;
};

test("Should return an event that fires when user click", async () => {
  const onCaretMove = vi.fn();
  const element = getElement(onCaretMove);

  await user.click(element);

  expect(onCaretMove.mock.calls).toHaveLength(1);
});

test("Should return an event that fires when user changes input", async () => {
  const onCaretMove = vi.fn();
  const element = getElement(onCaretMove);

  await clickOnContentEditableElement(user, element);
  await user.keyboard("test");

  expect(onCaretMove.mock.calls).not.toHaveLength(0);
});

test("Should return an event that fires after the caret has moved", async () => {
  const onCaretMove = vi.fn(() => getCaretPosition(element));
  const element = getElement(onCaretMove);

  await clickOnContentEditableElement(user, element);
  await user.keyboard("1234");
  await user.keyboard("{ArrowLeft}");

  expect(
    onCaretMove.mock.results[onCaretMove.mock.results.length - 1]?.value,
  ).toBe(3);
});
