import { useFormContext } from "react-hook-form";
import { Button } from "@/src/app/components/ui/button";
import { useSession } from "next-auth/react";
import { useEditQuery } from "@/src/lib/hooks/useEditQuery";

export function RecipeSubmitButton() {
  const session = useSession();
  const edit = useEditQuery(session.data);
  const { formState } = useFormContext();

  if (!edit) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-40 flex h-16 w-full items-center justify-center border-t bg-primary/20 backdrop-blur-md xs:bottom-4 xs:right-8 xs:w-64 xs:rounded-lg xs:border lg:bottom-auto lg:top-20">
      <Button
        type="submit"
        disabled={!formState.isDirty || formState.isSubmitting}
        variant="edit"
      >
        {formState.isSubmitting ? "..." : "SAUVEGARDER"}
      </Button>
    </div>
  );
}
