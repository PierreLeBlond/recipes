import { ViewMode } from "@/src/app/components/recipe/steps/step/description/viewMode/ViewMode";
import { cleanup, render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, describe, expect, test } from "vitest";

afterEach(() => {
  cleanup();
});

const defaultProps = {
  preview: false,
  setPreview: (_: boolean) => {},
};

const getComponent = (input: {
  preview?: boolean;
  setPreview?: (_: boolean) => void;
}) => {
  return render(
    <ViewMode props={{ ...defaultProps, ...input }}>
      <></>
    </ViewMode>,
  );
};

test("Should exists", () => {
  const component = getComponent({});
  expect(component).toBeDefined();
});

describe("Switch between edit and view mode", () => {
  test("Should have a preview button", async () => {
    const component = getComponent({});
    const button = component.queryByText("PRÉVISUALISATION");
    expect(button).not.toBeNull();
  });

  test("Should have an edition button", async () => {
    const component = getComponent({});
    const button = component.queryByText("ÉDITION");
    expect(button).not.toBeNull();
  });

  test("Should have the preview button checked when preview state is true", async () => {
    const component = getComponent({ preview: true });
    const button = component.getByLabelText("PRÉVISUALISATION");
    expect(button).toBeChecked();
  });

  test("Should have the edit button checked when preview state is false", async () => {
    const component = getComponent({ preview: false });
    const button = component.getByLabelText("ÉDITION");
    expect(button).toBeChecked();
  });

  const user = userEvent.setup();

  test("Should set state to preview mode when clicking on preview button", async () => {
    const { result } = renderHook(() => useState(false));
    const component = getComponent({
      preview: result.current[0],
      setPreview: result.current[1],
    });

    const button = component.getByLabelText("PRÉVISUALISATION");
    await user.click(button);

    expect(result.current[0]).toBe(true);
  });

  test("Should set state back to edit mode when clicking on edit button", async () => {
    const { result } = renderHook(() => useState(false));
    const component = getComponent({
      preview: result.current[0],
      setPreview: result.current[1],
    });
    const previewButton = component.getByLabelText("PRÉVISUALISATION");
    await user.click(previewButton);

    const editButton = component.getByLabelText("ÉDITION");
    await user.click(editButton);

    expect(result.current[0]).toBe(false);
  });
});
