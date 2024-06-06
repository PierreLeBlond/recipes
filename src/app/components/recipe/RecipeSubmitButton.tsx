import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { useFormContext } from "react-hook-form";
import { Button } from "@/src/app/components/ui/button";

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
      variant="edit"
    >
      SAUVEGARDER
    </Button>
  );
}
