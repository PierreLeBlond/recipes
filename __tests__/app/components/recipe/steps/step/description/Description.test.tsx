import userEvent from "@testing-library/user-event";
import { test, expect, vi, afterEach } from "vitest";
import { Description } from "@/src/app/components/recipe/steps/step/description/Description";
import { RenderResult, cleanup, render } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

const getComponent = ({
  description = "",
  onChangedDescriptionMock,
  caretPosition = null,
}: {
  description?: string;
  caretPosition?: number | null;
  onChangedDescriptionMock?: () => void;
}) => {
  return render(
    <Description
      onChangedDescription={onChangedDescriptionMock}
      props={{ description, caretPosition }}
    />,
  );
};

test("Component should exists", () => {
  const component = getComponent({});
  expect(component).toBeDefined();
});

const getContentEditable = (component: RenderResult) => {
  return component.getByRole("textbox");
};

const user = userEvent.setup();

test("Should fire an event when description is changed", async () => {
  const onChangedDescriptionMock = vi.fn();
  const component = getComponent({ onChangedDescriptionMock });
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("!");

  expect(onChangedDescriptionMock.mock.calls).toHaveLength(2);
  expect(onChangedDescriptionMock.mock.calls[1][0]).toEqual("!");
});

test("Should format initial value", async () => {
  const component = getComponent({ description: "Hello #World" });
  const contentEditable = getContentEditable(component);

  expect(contentEditable.innerHTML).toBe("Hello <b>#World</b>");
});

test("Should format new values", async () => {
  const component = getComponent({ description: "Hello" });
  const contentEditable = getContentEditable(component);

  component.rerender(
    <Description
      onChangedDescription={() => {}}
      props={{ description: "Hello #World!", caretPosition: null }}
    />,
  );

  expect(contentEditable.innerHTML).toBe("Hello <b>#World</b>!");
});

test("Should fire an event when typing a reference", async () => {
  const onTypedReferenceMock = vi.fn();
  const component = render(
    <Description
      onTypedReference={onTypedReferenceMock}
      props={{ description: "", caretPosition: null }}
    />,
  );
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("#");

  expect(onTypedReferenceMock.mock.calls).toHaveLength(2);
  expect(onTypedReferenceMock.mock.calls[1][0]).toStrictEqual({
    reference: "",
    caretPosition: 1,
  });
});

test("Should fire an event when user stop typing a reference", async () => {
  const onTypedReferenceMock = vi.fn();
  const component = render(
    <Description
      onTypedReference={onTypedReferenceMock}
      props={{ description: "", caretPosition: null }}
    />,
  );
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("#");
  await user.keyboard(" ");

  expect(onTypedReferenceMock.mock.calls).toHaveLength(3);
  expect(onTypedReferenceMock.mock.calls[2][0]).toStrictEqual({
    reference: null,
    caretPosition: 2,
  });
});

test("Should move caret to given non-null position", async () => {
  const component = getComponent({});
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("Hello");

  component.rerender(
    <Description
      onChangedDescription={() => {}}
      props={{ description: "Hello", caretPosition: 3 }}
    />,
  );

  await user.keyboard(" World");

  expect(contentEditable.innerHTML).toBe("Hel Worldlo");
});
