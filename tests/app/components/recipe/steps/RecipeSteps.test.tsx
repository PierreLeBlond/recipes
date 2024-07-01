import { cleanup, render, renderHook } from "@testing-library/react";
import { test, expect, vi, afterEach } from "vitest";
import { RecipeSteps } from "@/src/app/components/recipe/steps/RecipeSteps";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { SessionProvider } from "next-auth/react";
import userEvent from "@testing-library/user-event";


Range.prototype.getBoundingClientRect = () => {
    return {
        left: 0,
        top: 0,
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        bottom: 0,
        right: 0,
        toJSON: () => ""
    };
  };

vi.mock("next/navigation", async (importOriginal) => {
  const mod = await importOriginal<typeof import("next/navigation")>();
  return {
    ...mod,
    useSearchParams: () => ({
      get: vi.fn(() => "true"),
      entries: vi.fn(() => []),
    }),
  };
});

vi.mock("next-auth/react", async (importOriginal) => {
  const mod = await importOriginal<typeof import("next-auth/react")>();
  return {
    ...mod,
    useSession: () => ({
      data: {
        user: {
          role: "ADMIN",
        },
      },
    }),
  };
});

afterEach(() => {
  cleanup();
});

const getComponent = () => {
  const { result } = renderHook(() =>
    useForm<FormInputs>({
      defaultValues: {
        steps: [
          {
            description: "Description",
          },
        ],
        ingredients: [
          {
            food: {
              name: "Apple",
            },
            quantity: 1,
          },
        ],
      },
    }),
  );

  return render(
    <SessionProvider
      session={{ user: { id: "user", role: "ADMIN" }, expires: "" }}
    >
      <FormProvider {...result.current}>
        <RecipeSteps />
      </FormProvider>
    </SessionProvider>,
  );
};

test("Should exists", () => {
  const component = getComponent();

  expect(component).toBeDefined();
});

const user = userEvent.setup();

test("Should keep focus when editing a step", async () => {
  const component = getComponent();

  const contentEditable = component.getAllByRole("textbox")[0];

  expect(contentEditable).toBeDefined();

  if (!contentEditable) {
    return;
  }

  await user.click(contentEditable);

  expect(contentEditable).toHaveFocus();

  await user.keyboard("H");

  expect(contentEditable).toHaveFocus();
});

test("Should keep focus when completing a refererence", async () => {
  const component = getComponent();

  const contentEditable = component.getAllByRole("textbox")[0];

  expect(contentEditable).toBeDefined();

  if (!contentEditable) {
    return;
  }

  await user.click(contentEditable);
  await user.keyboard("Hello #A");

  const appleButton = component.getByText("Apple");
  await user.click(appleButton);

  expect(contentEditable).toHaveFocus();
});

test("Should complete a reference", async () => {
  const component = getComponent();

  const contentEditable = component.getAllByRole("textbox")[0];

  expect(contentEditable).toBeDefined();

  if (!contentEditable) {
    return;
  }

  await user.click(contentEditable);
  await user.keyboard(" Hello #A");

  const appleButton = component.getByText("Apple");
  await user.click(appleButton);

  expect(contentEditable.textContent).toBe("Description Hello #Apple ");
});
