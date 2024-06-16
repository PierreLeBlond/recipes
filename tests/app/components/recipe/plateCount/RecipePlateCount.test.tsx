import { RecipePlateCount } from "@/src/app/components/recipe/plateCount/RecipePlateCount";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { cleanup, render, renderHook } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { SessionProvider } from "next-auth/react";
import { MemoryRouter, useSearchParams, useLocation } from "react-router-dom";
import { plateCountLabels } from "./plateCountLabels";

vi.mock("next/navigation", async () => ({
  useSearchParams: () => {
    const [searchParams] = useSearchParams();
    return searchParams;
  },
  usePathname: () => {
    const { pathname } = useLocation();
    return pathname;
  },
}));

// https://github.com/jsdom/jsdom/issues/3429
beforeAll(() => {
  Element.prototype.animate = vi.fn();
});

afterEach(() => {
  cleanup();
});

type ComponentInput = {
  plateCount?: number;
  edit?: boolean;
};

const defaultInput = {
  plateCount: 8,
  edit: false,
} as const satisfies ComponentInput;

const getComponent = (input?: ComponentInput) => {
  const { result } = renderHook(() =>
    useForm<FormInputs>({
      defaultValues: {
        plateCount: 4,
        ingredients: [],
      },
    }),
  );
  return render(
    <SessionProvider
      session={{ user: { id: "user", role: "ADMIN" }, expires: "" }}
    >
      <MemoryRouter
        initialEntries={[
          `/recipes/?edit=${input?.edit || defaultInput.edit}&plateCount=${input?.plateCount || defaultInput.plateCount}`,
        ]}
      >
        <FormProvider {...result.current}>
          <RecipePlateCount></RecipePlateCount>
        </FormProvider>
      </MemoryRouter>
    </SessionProvider>,
  );
};

it("Should exists", () => {
  const component = getComponent();
  expect(component).toBeDefined();
});

describe("Presentation mode", () => {
  it("Should display the given plate count", () => {
    const component = getComponent();

    const plateCount = component.getByText("8");

    expect(plateCount).not.toBeNull();
  });

  it("Should have a + button", () => {
    const component = getComponent();
    const button = component.getByLabelText(plateCountLabels.changeButton(1));

    expect(button).not.toBeNull();
  });

  it("Should have a - button", () => {
    const component = getComponent();
    const button = component.getByLabelText(plateCountLabels.changeButton(-1));

    expect(button).not.toBeNull();
  });

  it("Should not show a reset button if presentation plate count matches form plate count", () => {
    const component = getComponent({ plateCount: 4 });
    const button = component.queryByLabelText(plateCountLabels.resetButton);

    expect(button).toBeNull();
  });

  it("Should show a reset button if presentation plate count missmatches form plate count", () => {
    const component = getComponent();
    const button = component.getByLabelText(plateCountLabels.resetButton);

    expect(button).not.toBeNull();
  });
});

describe("Edition mode", () => {
  it("Should display the form plate count", () => {
    const component = getComponent({ edit: true });

    const plateCount = component.getByText("4");

    expect(plateCount).not.toBeNull();
  });
});
