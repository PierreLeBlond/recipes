import { DeleteFoodButton } from "@/src/app/components/food/edit/DeleteFoodButton";
import { TRPCReactProvider } from "@/src/trpc/react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";

afterEach(() => {
  cleanup();
});

const getComponent = () => {
  return render(
    <TRPCReactProvider cookies={""}>
      <DeleteFoodButton props={{ id: "1", name: "test" }}></DeleteFoodButton>
    </TRPCReactProvider>,
  );
};

it("Should exists", () => {
  const component = getComponent();
  expect(component).toBeDefined();
});

it("Should have a button", () => {
  const component = getComponent();
  const button = component.queryByRole("button", {
    name: "delete",
  });

  expect(button).toBeDefined();
});
