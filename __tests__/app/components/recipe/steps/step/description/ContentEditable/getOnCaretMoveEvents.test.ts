import { getOnCaretMoveEvents } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretMoveEvents";
import { getCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretPosition";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi, Mock } from "vitest";

type eventNames = "onclick" | "onkeydown";

test("Should exists", () => {
  expect(getOnCaretMoveEvents).toBeDefined();
});

const user = userEvent.setup();

const getElement = (onCaretMove: Mock) => {
  const element = document.createElement("div");
  element.setAttribute("contenteditable", "true");
  document.body.appendChild(element);

  const events = getOnCaretMoveEvents(onCaretMove);
  for (const event in events) {
    element[event as eventNames] = events[event as eventNames];
  }

  return element;
};

test("Should return an event that fires when user click", async () => {
  const onCaretMove = vi.fn();
  const element = getElement(onCaretMove);

  await user.click(element);

  expect(onCaretMove.mock.calls).toHaveLength(1);
});

test("Should return an event that fires when user press a key", async () => {
  const onCaretMove = vi.fn();
  const element = getElement(onCaretMove);

  await user.click(element);
  await user.keyboard("{ArrowLeft}");

  expect(onCaretMove.mock.calls).toHaveLength(2);
});

test("Should return an event that fires for pressed arrow keys only", async () => {
  const onCaretMove = vi.fn(() => getCaretPosition(element));
  const element = getElement(onCaretMove);

  await user.click(element);
  await user.keyboard("1234");
  await user.keyboard("{ArrowLeft}");

  expect(onCaretMove.mock.calls).toHaveLength(2);
});

test("Should return an event that fires after the caret has moved", async () => {
  const onCaretMove = vi.fn(() => getCaretPosition(element));
  const element = getElement(onCaretMove);

  await user.click(element);
  await user.keyboard("1234");
  await user.keyboard("{ArrowLeft}");

  expect(
    onCaretMove.mock.results[onCaretMove.mock.results.length - 1]?.value,
  ).toBe(3);
});
