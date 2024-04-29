import userEvent from "@testing-library/user-event";
import { RenderResult, cleanup, render } from "@testing-library/react";
import { test, expect, vi, afterEach } from "vitest";
import { ContentEditable } from "@/src/app/components/recipe/steps/step/description/ContentEditable/ContentEditable";
import { setCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/setCaretPosition";

afterEach(() => {
  cleanup();
});

const getComponent = ({
  formatedDescription = "",
  onChangedDescriptionMock,
  caretPosition = null,
}: {
  formatedDescription?: string;
  caretPosition?: number | null;
  onChangedDescriptionMock?: () => void;
}) => {
  return render(
    <ContentEditable
      onChangedContent={onChangedDescriptionMock || (() => {})}
      props={{ formatedContent: formatedDescription, caretPosition }}
    />,
  );
};

const getContentEditable = (component: RenderResult) => {
  return component.getByRole("textbox");
};

test("Should should exists", () => {
  const component = getComponent({});

  expect(component).toBeDefined();
});

test("Should includes a div with role textbox and contentEditable attribute", () => {
  const component = getComponent({});
  const contentEditable = getContentEditable(component);

  expect(contentEditable).toBeDefined();
  expect(contentEditable).toHaveAttribute("contenteditable", "true");
});

const user = userEvent.setup();

test("Component fire an event when content is changed", async () => {
  const onChangedDescriptionMock = vi.fn();
  const component = getComponent({ onChangedDescriptionMock });
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("Hello World");

  expect(contentEditable).toHaveFocus();
  expect(contentEditable).toHaveTextContent("Hello World");
  expect(onChangedDescriptionMock.mock.calls).toHaveLength(12);
  expect(onChangedDescriptionMock.mock.calls[11][0].content).toEqual(
    "Hello World",
  );
  expect(onChangedDescriptionMock.mock.calls[11][0].caretPosition).toEqual(11);
});

test("Component should handled multiple lines", async () => {
  const onChangedDescriptionMock = vi.fn();
  const component = getComponent({ onChangedDescriptionMock });
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("Hello");
  await user.keyboard("\n");
  await user.keyboard("World");

  expect(contentEditable).toHaveFocus();
  expect(onChangedDescriptionMock.mock.calls).toHaveLength(12);
  expect(onChangedDescriptionMock.mock.calls[11][0].content).toEqual(
    "Hello\nWorld",
  );
});

test("Component should display given formated content", async () => {
  const component = getComponent({ formatedDescription: "<span>Hello</span>" });
  const contentEditable = getContentEditable(component);

  expect(contentEditable.innerHTML).toBe("<span>Hello</span>");
});

test("Component should display given formated content and override previous user input", async () => {
  const component = getComponent({});
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard(" World");

  expect(contentEditable.innerHTML).toBe(" World");

  component.rerender(
    <ContentEditable
      props={{ formatedContent: "<span>Hello</span>", caretPosition: null }}
      onChangedContent={() => {}}
    />,
  );

  expect(contentEditable.innerHTML).toBe("<span>Hello</span>");
});

test("Component should keep focus when given formated content is updated", async () => {
  const component = getComponent({});
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard(" World");

  expect(contentEditable).toHaveFocus();

  component.rerender(
    <ContentEditable
      props={{
        formatedContent: "<span>Hello World</span>",
        caretPosition: null,
      }}
      onChangedContent={() => {}}
    />,
  );

  expect(contentEditable).toHaveFocus();
});

test("Should keep caret position when updating formated content", async () => {
  const component = getComponent({ formatedDescription: "<a>Hello</a>" });
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("Hello World");

  setCaretPosition(contentEditable, 6);

  component.rerender(
    <ContentEditable
      props={{ formatedContent: "Hello World", caretPosition: null }}
      onChangedContent={() => {}}
    />,
  );

  await user.keyboard("#");

  expect(contentEditable.innerHTML).toBe("Hello #World");
});

test("Should fire an event when caret position is changed with arrows", async () => {
  const onChangedDescriptionMock = vi.fn();
  const component = getComponent({ onChangedDescriptionMock });
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("Hello World");
  expect(onChangedDescriptionMock.mock.calls).toHaveLength(12);
  expect(onChangedDescriptionMock.mock.calls[11][0].caretPosition).toBe(11);
  await user.keyboard("{ArrowLeft}");

  expect(onChangedDescriptionMock.mock.calls).toHaveLength(13);
  expect(onChangedDescriptionMock.mock.calls[12][0].caretPosition).toBe(10);
});
