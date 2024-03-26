import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { Button } from "@/src/lib/material";
import { useFormContext } from "react-hook-form";

export const RecipeSubmitButton = () => {
  const queryState = useQueryState();

  if (!queryState.edit) {
    return null;
  }

  const { formState } = useFormContext();

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
};
