import { CreateFood } from "@/src/app/components/food/create/CreateFood";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { createFoodLabels } from "./createFoodLabels";
import { createFoodErrorsMessages } from "./createFoodErrorsMessages";
import { Food } from "@/src/lib/types/Food";

afterEach(() => {
  cleanup();
});

const mockPointerCaptureEvent = () => {
  // https://github.com/testing-library/user-event/discussions/1087
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
};

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
    }) as const satisfies Food,
  foods: [],
} as const satisfies ComponentInputType;

const getComponent = (input?: ComponentInputType) => {
  return render(
    <CreateFood
      props={{
        ...defaultInput,
        ...input,
        session: {
          expires: "",
          user: {
            role: "ADMIN",
            id: "",
          },
        },
      }}
      onSubmit={input?.onSubmit || defaultInput.onSubmit}
    />,
  );
};

const getButton = (component: ReturnType<typeof getComponent>) => {
  return component.getByText(createFoodLabels.addButton);
};

const getNameInput = (component: ReturnType<typeof getComponent>) => {
  return component.getByLabelText(createFoodLabels.nameInputLabel);
};

const getUnitInput = (component: ReturnType<typeof getComponent>) => {
  return component.getByLabelText(createFoodLabels.unitInputLabel);
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

describe("name", () => {
  it("Should have an input to enter food name", () => {
    const component = getComponent();
    const input = getNameInput(component);
    expect(input).toBeDefined();
  });

  it("Should have a placeholder", () => {
    const component = getComponent();
    const input = component.getByPlaceholderText(
      createFoodLabels.nameInputLabel,
    );
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

  it("Should not accept a name that already exists", async () => {
    const foods = [
      {
        name: "sucre",
        density: 2.5,
        massPerPiece: 10,
        unit: "GRAM",
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

describe("unit", () => {
  it("Should have a unit input", () => {
    const component = getComponent();
    const input = getUnitInput(component);
    expect(input).toBeDefined();
  });

  it("Should have all units as options", async () => {
    mockPointerCaptureEvent();
    const units = [
      "g (gramme)",
      "l (litre)",
      "c.a.c. (cuillère à café)",
      "c.a.s. (cuillère à soupe)",
      "pièce",
      "pincée",
      "goutte",
    ] as const;
    const component = getComponent();
    const input = getUnitInput(component);

    await user.click(input);

    for (const unit of units) {
      expect(component.baseElement.textContent).toContain(unit);
    }
  });

  it("Shoud display an error if no unit is chosen on submit", async () => {
    const component = getComponent();
    const button = getButton(component);
    const nameInput = getNameInput(component);

    await user.click(nameInput);
    await user.keyboard("sucre");
    await user.click(button);

    expect(component.baseElement.textContent).toContain(
      createFoodErrorsMessages.unit,
    );
  });

  it("Should not submit if no unit is chosen", async () => {
    const onSubmit = vi.fn();
    const component = getComponent({ onSubmit });
    const button = getButton(component);
    const nameInput = getNameInput(component);

    await user.click(nameInput);
    await user.keyboard("sucre");
    await user.click(button);

    expect(onSubmit.mock.calls).toHaveLength(0);
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

  it("Should submit if inputs are valid", async () => {
    mockPointerCaptureEvent();
    const onSubmit = vi.fn();
    const component = getComponent({ onSubmit });
    const nameInput = getNameInput(component);
    const unitInput = getUnitInput(component);
    const button = getButton(component);

    await user.click(nameInput);
    await user.keyboard("sucre");

    await user.click(unitInput);
    const option = component.getByRole("option", { name: "l (litre)" });
    await user.click(option);

    await user.click(button);

    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: "sucre",
      density: null,
      massPerPiece: null,
      unit: "LITER",
    });
  });

  it("Should submit input values", async () => {
    const onSubmit = vi.fn();
    mockPointerCaptureEvent();
    const component = getComponent({ onSubmit });
    const nameInput = getNameInput(component);
    const unitInput = getUnitInput(component);
    const densityInput = getDensityInput(component);
    const massPerPieceInput = getMassPerPieceInput(component);
    const button = getButton(component);

    await user.click(nameInput);
    await user.keyboard("sucre");

    await user.click(unitInput);
    const option = component.getByRole("option", { name: "l (litre)" });
    await user.click(option);

    await user.click(densityInput);
    await user.keyboard("2.5");

    await user.click(massPerPieceInput);
    await user.keyboard("10");

    await user.click(button);

    expect(onSubmit.mock.calls[0][0]).toEqual({
      name: "sucre",
      density: 2.5,
      massPerPiece: 10,
      unit: "LITER",
    });
  });
});
