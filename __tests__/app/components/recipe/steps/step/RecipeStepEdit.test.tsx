import { RecipeStepEdit } from "@/src/app/components/recipe/steps/step/RecipeStepEdit";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, describe, vi, afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

const step = {
  id: "step",
  description: "Description",
  duration: 10,
  order: 1,
};

const foods = [{ name: "Apple" }, { name: "Banana" }, { name: "Carrot" }];

const getComponent = () => {
  return render(
    <RecipeStepEdit
      props={{
        step,
        index: 1,
        foods,
      }}
    />,
  );
};

test("Should exists", () => {
  const component = getComponent();
  expect(component).toBeDefined();
});

const user = userEvent.setup();

describe("Update description", () => {
  test("Should display the description", () => {
    const component = getComponent();
    expect(component.getByText("Description")).toBeDefined();
  });

  test("Should not loose focus when content is promagratically changed", async () => {
    const component = getComponent();
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("Hello");

    contentEditable.innerHTML = "Hello World";

    expect(contentEditable).toHaveFocus();
  });

  test("Should not loose focus when component is rerendered", async () => {
    const component = getComponent();
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("Hello");

    component.rerender(
      <RecipeStepEdit
        props={{
          step: {
            ...step,
            description: "Description Hello",
          },
          index: 1,
          foods,
        }}
      />,
    );

    expect(contentEditable).toHaveFocus();
  });

  test("Should fire an event when description is changed", async () => {
    const onDescriptionChangeMock = vi.fn();
    const component = render(
      <RecipeStepEdit
        props={{
          step,
          index: 1,
          foods: [],
        }}
        onChangedDescription={onDescriptionChangeMock}
      />,
    );

    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("!");

    expect(onDescriptionChangeMock.mock.calls).toHaveLength(2);
    expect(onDescriptionChangeMock.mock.calls[1][0]).toBe(
      `${step.description}!`,
    );
  });
});

describe("Delete", () => {
  test("Should have a button to remove the step", () => {
    const component = getComponent();

    const removeButton = component.getByLabelText("Supprimer l'étape");

    expect(removeButton).toBeDefined();
  });

  test("Should fire an event when the remove button is clicked", async () => {
    const handleDeleteStepMock = vi.fn();
    const component = render(
      <RecipeStepEdit
        props={{
          step,
          index: 1,
          foods: [],
        }}
        onDeleteStep={handleDeleteStepMock}
      />,
    );

    const removeButton = component.getByLabelText("Supprimer l'étape");

    await user.click(removeButton);

    expect(handleDeleteStepMock.mock.calls).toHaveLength(1);
  });
});

describe("Add a reference", () => {
  test("Should not display foods when user isn't typing a reference", () => {
    const component = getComponent();
    const buttons = component
      .queryAllByRole("button")
      .filter((button) =>
        foods.map((food) => food.name).includes(button.textContent || ""),
      );

    expect(buttons).toHaveLength(0);
  });

  test("Should display all foods when user is typing a #", async () => {
    const component = getComponent();
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("#");

    const buttons = component
      .queryAllByRole("button")
      .filter((button) =>
        foods.map((food) => food.name).includes(button.textContent || ""),
      );

    expect(buttons.map((button) => button.textContent)).toStrictEqual([
      "Apple",
      "Banana",
      "Carrot",
    ]);
  });

  test("Should display corresponding foods when user is typing a reference", async () => {
    const component = getComponent();
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("Hello #A");

    const buttons = component
      .queryAllByRole("button")
      .filter((button) =>
        foods.map((food) => food.name).includes(button.textContent || ""),
      );

    expect(buttons.map((button) => button.textContent)).toStrictEqual([
      "Apple",
    ]);
  });

  test("Should not display foods when user replace the cursor elsewhere", async () => {
    const component = getComponent();
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("Hello #A");
    await user.keyboard("[ArrowLeft]");
    await user.keyboard("[ArrowLeft]");
    await user.keyboard("[ArrowLeft]");
    await user.keyboard("X");

    const buttons = component
      .queryAllByRole("button")
      .filter((button) =>
        foods.map((food) => food.name).includes(button.textContent || ""),
      );

    expect(buttons).toHaveLength(0);
    expect(contentEditable.textContent).toBe("DescriptionHelloX #A");
  });

  test("Should complete the reference when a food is clicked", async () => {
    const onChangedDescription = vi.fn();
    const component = render(
      <RecipeStepEdit
        props={{
          step,
          index: 1,
          foods,
        }}
        onChangedDescription={onChangedDescription}
      />,
    );
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard(" #A");

    component.rerender(
      <RecipeStepEdit
        props={{
          step: {
            ...step,
            description: "Description #A",
          },
          index: 1,
          foods,
        }}
        onChangedDescription={onChangedDescription}
      />,
    );

    const appleButton = component.getByText("Apple");
    await user.click(appleButton);

    expect(onChangedDescription.mock.calls).toHaveLength(5);
    expect(onChangedDescription.mock.calls[4][0]).toBe("Description #Apple ");
  });

  test("Should complete only the reference being typed when a food is clicked", async () => {
    const onChangedDescription = vi.fn();
    const component = render(
      <RecipeStepEdit
        props={{
          step: {
            ...step,
            description: "Description #A",
          },
          index: 1,
          foods,
        }}
        onChangedDescription={onChangedDescription}
      />,
    );
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard(" #A");

    component.rerender(
      <RecipeStepEdit
        props={{
          step: {
            ...step,
            description: "Description #A #A",
          },
          index: 1,
          foods,
        }}
        onChangedDescription={onChangedDescription}
      />,
    );

    const appleButton = component.getByText("Apple");
    await user.click(appleButton);

    expect(onChangedDescription.mock.calls).toHaveLength(5);
    expect(onChangedDescription.mock.calls[4][0]).toBe(
      "Description #A #Apple ",
    );
  });

  test("Should move the caret at the end of the reference when a food is clicked", async () => {
    const component = render(
      <RecipeStepEdit
        props={{
          step,
          index: 1,
          foods,
        }}
      />,
    );
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard(" #A");

    component.rerender(
      <RecipeStepEdit
        props={{
          step: {
            ...step,
            description: "Description #A",
          },
          index: 1,
          foods,
        }}
      />,
    );

    const appleButton = component.getByText("Apple");
    await user.click(appleButton);

    component.rerender(
      <RecipeStepEdit
        props={{
          step: {
            ...step,
            description: "Description #Apple ",
          },
          index: 1,
          foods,
        }}
      />,
    );

    await user.keyboard("and");

    expect(contentEditable.textContent).toBe("Description #Apple and");
  });
});
