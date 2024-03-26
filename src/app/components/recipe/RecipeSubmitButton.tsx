import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { Button } from "@/src/lib/material";
import { useFormContext } from "react-hook-form";

export function RecipeSubmitButton() {
  const queryState = useQueryState();
  const { formState } = useFormContext();

  if (!queryState.edit) {
    return null;
  }

  return (
    <Button
      type="submit"
      className="w-full"
      disabled={!formState.isDirty}
      variant="filled"
      color="blue-gray"
    >
      Sauvegarder
    </Button>
  );
}
