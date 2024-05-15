import { CreateFood } from "@/src/app/components/recipe/food/CreateFood";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { createFoodLabels } from "./createFoodLabels";
import { createFoodErrorsMessages } from "./createFoodErrorsMessages";
import { Food } from "@/src/lib/types/Food";

afterEach(() => {
  cleanup();
});

const user = userEvent.setup();

type ComponentInputType = {
  onSubmit?: (food: Food) => Promise<Food>;
  foods?: Food[];
};

const defaultInput = {
  onSubmit: async () =>
    ({
      name: "sucre",
      density: 2.5,
      massPerPiece: null,
      unit: "GRAM",
      image: null,
    }) as const satisfies Food,
  foods: [],
} as const satisfies ComponentInputType;

const getComponent = (input?: ComponentInputType) => {
  return render(
    <CreateFood
      props={{ ...defaultInput, ...input }}
      onSubmit={input?.onSubmit || defaultInput.onSubmit}
    />,
  );
};

const getButton = (component: ReturnType<typeof getComponent>) => {
  return component.getByText(createFoodLabels.addButton);
};

const getNameInput = (component: ReturnType<typeof getComponent>) => {
  return component.getByLabelText(createFoodLabels.nameInput);
};

const getDensityInput = (component: ReturnType<typeof getComponent>) => {
  return component.getByLabelText(createFoodLabels.densityInputLabel);
};

const getMassPerPieceInput = (component: ReturnType<typeof getComponent>) => {
  return component.getByLabelText(createFoodLabels.massPerPiece.label);
};

it("Should exists", () => {
  const component = getComponent();
  expect(component).toBeDefined();
});

it("Should have a title", () => {
  const component = getComponent();
  expect(component.baseElement.textContent).toContain(createFoodLabels.title);
});

describe("submit", () => {
  it("Should have a button to add a food", () => {
    const component = getComponent();
    const button = getButton(component);

    expect(button).toBeDefined();
  });

  it("Should not submit if nothing is edited", async () => {
    const onSubmit = vi.fn();
    const component = getComponent({ onSubmit });
    const button = getButton(component);

    await user.click(button);

    expect(onSubmit.mock.calls).toHaveLength(0);
  });
});

describe("name", () => {
  it("Should have an input to enter food name", () => {
    const component = getComponent();
    const input = getNameInput(component);
    expect(input).toBeDefined();
  });

  it("Should have a placeholder", () => {
    const component = getComponent();
    const input = component.getByPlaceholderText(createFoodLabels.nameInput);
    expect(input).toBeDefined();
  });

  it("Should display an error if name is too short", async () => {
    const component = getComponent();
    const input = getNameInput(component);
    const button = getButton(component);

    await user.click(input);
    await user.keyboard("s");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.name.length,
    );
  });

  it("Should display an error if name is too long", async () => {
    const component = getComponent();
    const input = getNameInput(component);
    const button = getButton(component);

    await user.click(input);
    await user.keyboard("s".repeat(34));
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.name.length,
    );
  });

  it("Should display an error if name is not a noun", async () => {
    const component = getComponent();
    const input = getNameInput(component);
    const button = getButton(component);

    await user.click(input);
    await user.keyboard("poudre d'amande1");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.name.pattern,
    );

    await user.click(input);
    await user.keyboard("[Backspace]%");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.name.pattern,
    );

    await user.click(input);
    await user.keyboard("[Backspace]");
    await user.click(button);

    expect(component.baseElement.textContent).not.toContain(
      createFoodErrorsMessages.name.pattern,
    );
  });

  it("Should return given name on submit if valid", async () => {
    const onSubmit = vi.fn();
    const component = getComponent({ onSubmit });
    const input = getNameInput(component);
    const button = getButton(component);

    await user.click(input);
    await user.keyboard("sucre");
    await user.click(button);

    expect(onSubmit.mock.calls[0][0].name).toBe("sucre");
  });
});

describe("density", () => {
  it("Should have a density input", () => {
    const component = getComponent();
    const densityInput = getDensityInput(component);
    expect(densityInput).toBeDefined();
  });

  it("Should have a density input placeholder", () => {
    const component = getComponent();
    const input = component.getByPlaceholderText(
      createFoodLabels.densityInputPlaceholder,
    );
    expect(input).toBeDefined();
  });

  it("Should only accept floating numbers", async () => {
    const component = getComponent();
    const densityInput = getDensityInput(component);
    const button = getButton(component);

    await user.click(densityInput);
    await user.keyboard("a %1.3");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.density,
    );
  });

  it("Should not accept negative numbers", async () => {
    const component = getComponent();
    const densityInput = getDensityInput(component);
    const button = getButton(component);

    await user.click(densityInput);
    await user.keyboard("-1");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.density,
    );
  });

  // highest value comes from https://www.rankred.com/densest-materials-on-earth-1/
  it("Should not accept numbers greater than 23", async () => {
    const component = getComponent();
    const densityInput = getDensityInput(component);
    const button = getButton(component);

    await user.click(densityInput);
    await user.keyboard("23.01");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.density,
    );
  });

  it("Should return given density on submit if valid", async () => {
    const onSubmit = vi.fn();
    const component = getComponent({ onSubmit });
    const densityInput = getDensityInput(component);
    const nameInput = getNameInput(component);
    const button = getButton(component);

    await user.click(nameInput);
    await user.keyboard("sucre");
    await user.click(densityInput);
    await user.keyboard("1.5");
    await user.click(button);

    expect(onSubmit.mock.calls[0][0].density).toBe(1.5);
  });

  it("Should return null if density is empty", async () => {
    const onSubmit = vi.fn();
    const component = getComponent({ onSubmit });
    const nameInput = getNameInput(component);
    const button = getButton(component);

    await user.click(nameInput);
    await user.keyboard("sucre");
    await user.click(button);

    expect(onSubmit.mock.calls[0][0].density).toBe(null);
  });
});

describe("mass per piece", () => {
  it("Should have a mass per piece input", () => {
    const component = getComponent();
    const input = getMassPerPieceInput(component);
    expect(input).toBeDefined();
  });

  it("Should have a mass per piece input placeholder", () => {
    const component = getComponent();
    const input = component.getByPlaceholderText(
      createFoodLabels.massPerPiece.placeholder,
    );
    expect(input).toBeDefined();
  });

  it("Should only accept floating numbers", async () => {
    const component = getComponent();
    const input = getMassPerPieceInput(component);
    const button = getButton(component);

    await user.click(input);
    await user.keyboard("a %10.0");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.massPerPiece,
    );
  });

  it("Should not accept negative numbers", async () => {
    const component = getComponent();
    const input = getMassPerPieceInput(component);
    const button = getButton(component);

    await user.click(input);
    await user.keyboard("-1");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.massPerPiece,
    );
  });

  it("Should not accept numbers greater than 1000.00", async () => {
    const component = getComponent();
    const input = getMassPerPieceInput(component);
    const button = getButton(component);

    await user.click(input);
    await user.keyboard("1000.01");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.massPerPiece,
    );
  });

  it("Should return given mass per piece on submit if valid", async () => {
    const onSubmit = vi.fn();
    const component = getComponent({ onSubmit });
    const input = getMassPerPieceInput(component);
    const nameInput = getNameInput(component);
    const button = getButton(component);

    await user.click(nameInput);
    await user.keyboard("sucre");
    await user.click(input);
    await user.keyboard("10.5");
    await user.click(button);

    expect(onSubmit.mock.calls[0][0].massPerPiece).toBe(10.5);
  });

  it("Should return null if mass per piece is empty", async () => {
    const onSubmit = vi.fn();
    const component = getComponent({ onSubmit });
    const nameInput = getNameInput(component);
    const button = getButton(component);

    await user.click(nameInput);
    await user.keyboard("sucre");
    await user.click(button);

    expect(onSubmit.mock.calls[0][0].massPerPiece).toBe(null);
  });

  describe("existing foods", () => {
    it("Should not accept a name that already exists", async () => {
      const foods = [
        {
          name: "sucre",
          density: 2.5,
          massPerPiece: 10,
          unit: "GRAM",
          image: null,
        },
      ] as const satisfies Food[];
      const component = getComponent({ foods });
      const input = getNameInput(component);
      const button = getButton(component);

      await user.click(input);
      await user.keyboard("sucre");
      await user.click(button);

      expect(component.baseElement.textContent).toContain(
        createFoodErrorsMessages.name.unique,
      );
    });
  });
});
