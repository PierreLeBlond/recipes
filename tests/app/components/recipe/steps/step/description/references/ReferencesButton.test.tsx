import { ReferencesButton } from "@/src/app/components/recipe/steps/step/description/references/ReferencesButton";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

afterEach(() => {
  cleanup();
});

type ComponentInput = {
  props?: {
    description?: string;
    caretPosition?: number;
  };
  onChangedDescriptionMock?: () => void;
};

const defaultInput = {
  props: {
    description: "Dans un bol, mettre ",
    caretPosition: 20,
  },
  onChangedDescriptionMock: () => {},
} as const satisfies ComponentInput;

const getComponent = (input: ComponentInput) => {
  return render(
    <ReferencesButton
      onChangedDescription={
        input.onChangedDescriptionMock || defaultInput.onChangedDescriptionMock
      }
      props={{ ...defaultInput.props, ...input.props }}
    />,
  );
};

test("Should exists", () => {
  const component = getComponent({});
  expect(component).toBeDefined();
});

test("Should have a # button", () => {
  const component = getComponent({});
  const button = component.queryByRole("button");
  expect(button).not.toBeNull();
});

const user = userEvent.setup();

test("Should add a # when the # button is clicked", async () => {
  const onChangedDescription = vi.fn();
  const component = getComponent({
    onChangedDescriptionMock: onChangedDescription,
  });

  const button = component.getByRole("button");
  await user.click(button);

  expect(onChangedDescription.mock.calls).toHaveLength(1);
  expect(onChangedDescription.mock.calls?.[0]?.[0]).toMatchObject({
    description: "Dans un bol, mettre #",
  });
});

test("Should add a # at the caret position when the # button is clicked", async () => {
  const onChangedDescription = vi.fn();
  const component = getComponent({
    props: {
      description: "Dans un bol, mettre ",
      caretPosition: 13,
    },
    onChangedDescriptionMock: onChangedDescription,
  });

  const button = component.getByRole("button");
  await user.click(button);

  expect(onChangedDescription.mock.calls).toHaveLength(1);
  expect(onChangedDescription.mock.calls?.[0]?.[0]).toMatchObject({
    description: "Dans un bol, #mettre ",
    caretPosition: 14,
  });
});

test("Should move the caret after the inserted # when the button is clicked", async () => {
  const onChangedDescription = vi.fn();
  const component = getComponent({
    onChangedDescriptionMock: onChangedDescription,
  });

  const button = component.getByRole("button");
  await user.click(button);

  expect(onChangedDescription.mock.calls).toHaveLength(1);
  expect(onChangedDescription.mock.calls?.[0]?.[0]).toMatchObject({
    caretPosition: 21,
  });
});
