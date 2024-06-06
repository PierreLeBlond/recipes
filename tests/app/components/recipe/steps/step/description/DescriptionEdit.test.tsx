import userEvent from "@testing-library/user-event";
import { test, expect, vi, afterEach, describe } from "vitest";
import { DescriptionEdit } from "@/src/app/components/recipe/steps/step/description/DescriptionEdit";
import { RenderResult, cleanup, render } from "@testing-library/react";
import { getCaretPosition } from "@/src/app/components/recipe/steps/step/description/ContentEditable/getCaretPosition";
import { Ingredient } from "@/src/lib/types/Ingredient";

afterEach(() => {
  cleanup();
});

const user = userEvent.setup();

type ComponentInput = {
  description?: string;
  ingredients?: Ingredient[];
  plateRatio?: number;
  onChangedDescriptionMock?: () => void;
};

const defaultInput = {
  description: "Dans un bol, mettre ",
  ingredients: [
    {
      food: {
        name: "farine",
        density: null,
        massPerPiece: null,
        unit: "GRAM",
      },
      quantity: 200,
      unit: "GRAM",
    },
  ],
  plateRatio: 1,
  onChangedDescriptionMock: () => {},
} as const satisfies ComponentInput;

const getComponent = (input: ComponentInput) => {
  return render(
    <DescriptionEdit
      onChangedDescription={
        input.onChangedDescriptionMock || defaultInput.onChangedDescriptionMock
      }
      props={{ ...defaultInput, ...input }}
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

test("Should fire an event when description is changed", async () => {
  const onChangedDescriptionMock = vi.fn();
  const component = getComponent({ onChangedDescriptionMock });
  const contentEditable = getContentEditable(component);

  await user.click(contentEditable);
  await user.keyboard("u");

  expect(onChangedDescriptionMock.mock.calls).toHaveLength(2);
  expect(onChangedDescriptionMock.mock.calls[1][0]).toEqual(
    "Dans un bol, mettre u",
  );
});

test("Should format value", async () => {
  const component = getComponent({
    description: "Dans un bol, mettre #far",
  });
  const contentEditable = getContentEditable(component);

  expect(contentEditable.innerHTML).toBe("Dans un bol, mettre <b>#far</b>");
});

describe("Add a reference", () => {
  const ingredients = [
    {
      food: {
        name: "pomme",
        density: null,
        massPerPiece: null,
        unit: "PIECE",
      },
      quantity: 1,
      unit: "PIECE",
    },
    {
      food: {
        name: "poire",
        density: null,
        massPerPiece: null,
        unit: "PIECE",
      },
      quantity: 1,
      unit: "PIECE",
    },
    {
      food: {
        name: "abricot",
        density: null,
        massPerPiece: null,
        unit: "PIECE",
      },
      quantity: 1,
      unit: "PIECE",
    },
  ] as const satisfies Ingredient[];

  const getButtons = (component: RenderResult) => {
    return component
      .queryAllByRole("button")
      .filter((button) =>
        ingredients
          .map(({ food: { name } }) => name.valueOf())
          .includes(button.textContent || ""),
      );
  };

  test("Should not display foods when user isn't typing a reference", () => {
    const component = getComponent({ ingredients });
    const buttons = getButtons(component);

    expect(buttons).toHaveLength(0);
  });

  test("Should display all foods when user is typing a #", async () => {
    const component = getComponent({
      ingredients,
      description: "Dans un bol, mettre #",
    });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);

    const buttons = getButtons(component);

    expect(buttons.map((button) => button.textContent)).toStrictEqual([
      "pomme",
      "poire",
      "abricot",
    ]);
  });

  test("Should display corresponding foods when user is typing a reference", async () => {
    const component = getComponent({
      ingredients,
      description: "Dans un bol, mettre #a",
    });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);

    const buttons = getButtons(component);

    expect(buttons.map((button) => button.textContent)).toStrictEqual([
      "abricot",
    ]);
  });

  test("Should not display foods when user replace the cursor elsewhere", async () => {
    const component = getComponent({
      ingredients,
      description: "Dans un bol, mettre #p",
    });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);

    await user.keyboard("[ArrowLeft]");
    await user.keyboard("[ArrowLeft]");
    await user.keyboard("[ArrowLeft]");

    const buttons = getButtons(component);

    expect(buttons).toHaveLength(0);
  });

  test("Should not display foods when loosing focus", async () => {
    const component = getComponent({ ingredients });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("#p");
    await user.click(document.body);

    const buttons = getButtons(component);

    expect(buttons).toHaveLength(0);
  });

  test("Should complete the reference when a food is clicked", async () => {
    const onChangedDescription = vi.fn();
    const component = getComponent({
      ingredients,
      description: "Dans un bol, mettre #p",
      onChangedDescriptionMock: onChangedDescription,
    });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);

    const appleButton = component.getByText("pomme");
    await user.click(appleButton);

    expect(onChangedDescription.mock.calls).toHaveLength(2);
    expect(onChangedDescription.mock.calls[1][0]).toBe(
      "Dans un bol, mettre #pomme ",
    );
  });

  test("Should complete the reference when a food is clicked and the caret is in the middle of the reference being typed", async () => {
    const onChangedDescription = vi.fn();
    const component = getComponent({
      description: "Dans un bol, mettre #pomme",
      ingredients,
      onChangedDescriptionMock: onChangedDescription,
    });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);
    await user.keyboard("[ArrowLeft]");
    await user.keyboard("[ArrowLeft]");
    await user.keyboard("[ArrowLeft]");
    await user.keyboard("[ArrowLeft]");

    const appleButton = component.getByText("pomme");
    await user.click(appleButton);

    expect(onChangedDescription.mock.calls).toHaveLength(6);
    expect(onChangedDescription.mock.calls[5][0]).toBe(
      "Dans un bol, mettre #pomme omme",
    );

    const caretPosition = getCaretPosition(contentEditable);
    expect(caretPosition).toBe(26);
  });

  test("Should add a space after clicking on a reference only if it does not exists yet", async () => {
    const onChangedDescription = vi.fn();
    const component = getComponent({
      ingredients,
      onChangedDescriptionMock: onChangedDescription,
      description: "Dans un bol, mettre #pomme ",
    });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);

    await user.keyboard("{ArrowLeft}");

    const appleButton = component.getByText("pomme");
    await user.click(appleButton);

    expect(onChangedDescription.mock.calls).toHaveLength(3);
    expect(onChangedDescription.mock.calls[2][0]).toBe(
      "Dans un bol, mettre #pomme ",
    );
  });

  test("Should complete only the reference being typed when a food is clicked", async () => {
    const onChangedDescription = vi.fn();
    const component = getComponent({
      description: "Dans un bol, mettre #p #p",
      ingredients,
      onChangedDescriptionMock: onChangedDescription,
    });
    const contentEditable = component.getByRole("textbox");

    await user.click(contentEditable);

    const appleButton = component.getByText("pomme");
    await user.click(appleButton);

    expect(onChangedDescription.mock.calls).toHaveLength(2);
    expect(onChangedDescription.mock.calls[1][0]).toBe(
      "Dans un bol, mettre #p #pomme ",
    );
  });

  describe("Navigate trough foods references", () => {
    test("Should have first item highlighted by default", async () => {
      const component = getComponent({
        ingredients,
        description: "Dans un bol, mettre #",
      });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);

      const button = component
        .queryAllByRole("button")
        .find((button) => button.textContent === "pomme");

      expect(button).toHaveClass("selected");
    });

    test("Should navigate to the next item when pressing ArrowDown", async () => {
      const component = getComponent({
        ingredients,
        description: "Dans un bol, mettre #",
      });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);
      await user.keyboard("[ArrowDown]");

      const button = component
        .queryAllByRole("button")
        .find((button) => button.textContent === "poire");

      expect(button).toHaveClass("selected");
    });

    test("Should circle back to the first item when pressing ArrowDown on the last item", async () => {
      const component = getComponent({
        ingredients,
        description: "Dans un bol, mettre #",
      });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);
      await user.keyboard("[ArrowDown]");
      await user.keyboard("[ArrowDown]");
      await user.keyboard("[ArrowDown]");

      const button = component
        .queryAllByRole("button")
        .find((button) => button.textContent === "pomme");

      expect(button).toHaveClass("selected");
    });

    test("Should navigate to the previous item when pressing ArrowUp", async () => {
      const component = getComponent({
        ingredients,
        description: "Dans un bol, mettre #",
      });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);
      await user.keyboard("[ArrowDown]");
      await user.keyboard("[ArrowUp]");

      const button = component
        .queryAllByRole("button")
        .find((button) => button.textContent === "pomme");

      expect(button).toHaveClass("selected");
    });

    test("Should circle back to the last item when pressing ArrowUp on the first item", async () => {
      const component = getComponent({
        ingredients,
        description: "Dans un bol, mettre #",
      });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);
      await user.keyboard("[ArrowUp]");

      const button = component
        .queryAllByRole("button")
        .find((button) => button.textContent === "abricot");

      expect(button).toHaveClass("selected");
    });

    test("Should only fire a single event when pressing Tab", async () => {
      const onChangedDescription = vi.fn();
      const component = getComponent({
        ingredients,
        onChangedDescriptionMock: onChangedDescription,
      });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);
      await user.keyboard("#");
      await user.keyboard("[Tab]");

      expect(onChangedDescription.mock.calls).toHaveLength(3);
    });

    test("Should select the item when pressing Tab", async () => {
      const onChangedDescription = vi.fn();
      const component = getComponent({
        ingredients,
        description: "Dans un bol, mettre #",
        onChangedDescriptionMock: onChangedDescription,
      });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);

      await user.keyboard("[ArrowDown]");
      await user.keyboard("[Tab]");

      expect(onChangedDescription.mock.calls).toHaveLength(3);
      expect(onChangedDescription.mock.calls[2][0]).toBe(
        "Dans un bol, mettre #poire ",
      );
    });
  });

  describe("The # button", () => {
    test("Should have a # button", async () => {
      const component = getComponent({ ingredients });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);

      const button = component
        .getAllByRole("button")
        .find((button) =>
          button.textContent?.includes("AJOUTER UN INGRÉDIENT"),
        );

      expect(button).toBeDefined();
    });

    test("Should not have a # button when a reference is being typed", async () => {
      const component = getComponent({
        ingredients,
        description: "Dans un bol, mettre #p",
      });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);

      const button = component
        .getAllByRole("button")
        .find((button) =>
          button.textContent?.includes("Ajouter un ingrédient"),
        );

      expect(button).not.toBeDefined();
    });

    test("Should not lost content editable focus when the button is clicked", async () => {
      const component = getComponent({ ingredients });
      const contentEditable = component.getByRole("textbox");

      await user.click(contentEditable);

      const button = component
        .getAllByRole("button")
        .find((button) =>
          button.textContent?.includes("Ajouter un ingrédient"),
        );

      if (!button) {
        return;
      }

      await user.click(button);

      expect(contentEditable).toHaveFocus();
    });
  });
});

describe("Preview", () => {
  const ingredients = [
    {
      food: {
        name: "pomme",
        density: null,
        massPerPiece: null,
        unit: "PIECE",
      },
      quantity: 2,
      unit: "PIECE",
    },
  ] as const satisfies Ingredient[];

  test("Should show preview when the preview button is clicked", async () => {
    const component = getComponent({
      ingredients,
      description: "Dans un bol, mettre #pomme",
    });
    const button = component.getByLabelText("PRÉVISUALISATION");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      "Dans un bol, mettre 2 pomme",
    );
  });

  test("Should show edition when the edition button is clicked", async () => {
    const component = getComponent({
      ingredients,
      description: "Dans un bol, mettre #pomme",
    });
    const button = component.getByText("PRÉVISUALISATION");
    await user.click(button);

    const editionButton = component.getByText("ÉDITION");
    await user.click(editionButton);

    expect(component.baseElement.textContent).toContain(
      "Dans un bol, mettre #pomme",
    );
  });
});
