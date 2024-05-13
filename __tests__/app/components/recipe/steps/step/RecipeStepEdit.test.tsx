import { Units } from "@/prisma/generated/client/index.js";
import { RecipeStepEdit } from "@/src/app/components/recipe/steps/step/RecipeStepEdit";
import { RenderResult, cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, describe, vi, afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

type ComponentInput = {
  props: {
    step?: {
      description: string;
    };
    index?: number;
    ingredients?: {
      food: {
        name: string;
        density: number | null;
        massPerPiece: number | null;
        unit: Units;
        image: string | null;
      };
      quantity: number;
      unit: Units;
    }[];
    plateRatio?: number;
  };
  onChangedDescription?: (description: string) => void;
  onDeleteStep?: () => void;
};

const defaultInput = {
  props: {
    step: {
      description: "Dans un bol, mettre #farine et #sucre.",
    },
    index: 0,
    ingredients: [],
    plateRatio: 1,
  },
  onChangedDescription: () => {},
  onDeleteStep: () => {},
} as const satisfies ComponentInput;

const getComponent = (input: ComponentInput) => {
  return render(
    <RecipeStepEdit
      props={{ ...defaultInput.props, ...input.props }}
      onChangedDescription={
        input.onChangedDescription || defaultInput.onChangedDescription
      }
      onDeleteStep={input.onDeleteStep || defaultInput.onDeleteStep}
    />,
  );
};

const rerenderComponent = (component: RenderResult, input: ComponentInput) => {
  component.rerender(
    <RecipeStepEdit
      props={{ ...defaultInput.props, ...input.props }}
      onChangedDescription={
        input.onChangedDescription || defaultInput.onChangedDescription
      }
      onDeleteStep={input.onDeleteStep || defaultInput.onDeleteStep}
    />,
  );
};

test("Should exists", () => {
  const component = getComponent({ props: {} });
  expect(component).toBeDefined();
});

const user = userEvent.setup();

describe("Update description", () => {
  test("Should display the description", () => {
    const component = getComponent({ props: {} });
    expect(
      component.queryByText(defaultInput.props.step.description),
    ).toBeDefined();
  });

  test("Should not loose focus when content is promagratically changed", async () => {
    const component = getComponent({ props: {} });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);

    contentEditable.innerHTML = "Mettre dans un bol et mélanger.";

    expect(contentEditable).toHaveFocus();
  });

  test("Should not loose focus when component is rerendered", async () => {
    const component = getComponent({ props: {} });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);

    rerenderComponent(component, {
      props: {
        step: {
          description: "Mettre dans un bol et mélanger.",
        },
      },
    });

    expect(contentEditable).toHaveFocus();
  });

  test("Should fire an event when description is changed", async () => {
    const onDescriptionChangeMock = vi.fn();

    const component = getComponent({
      props: {},
      onChangedDescription: onDescriptionChangeMock,
    });

    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("!");

    expect(onDescriptionChangeMock.mock.calls).toHaveLength(2);
    expect(onDescriptionChangeMock.mock.calls[1][0]).toBe(
      `${defaultInput.props.step.description}!`,
    );
  });
});

describe("Delete", () => {
  test("Should have a button to remove the step", () => {
    const component = getComponent({ props: {} });

    const removeButton = component.getByLabelText("Supprimer l'étape");

    expect(removeButton).toBeDefined();
  });

  test("Should fire an event when the remove button is clicked", async () => {
    const handleDeleteStepMock = vi.fn();
    const component = getComponent({
      props: {},
      onDeleteStep: handleDeleteStepMock,
    });

    const removeButton = component.getByLabelText("Supprimer l'étape");

    await user.click(removeButton);

    expect(handleDeleteStepMock.mock.calls).toHaveLength(1);
  });
});
