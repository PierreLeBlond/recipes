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
    <div className="fixed bottom-0 z-40 flex w-full justify-center border-t bg-primary/20 px-16 py-4 backdrop-blur-md xs:bottom-4 xs:w-64 xs:rounded-lg xs:border">
      <Button
        type="submit"
        className="w-full"
        disabled={!formState.isDirty}
        variant="edit"
      >
        SAUVEGARDER
      </Button>
    </div>
  );
}
