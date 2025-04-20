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
    <div className="bg-primary/20 xs:bottom-4 xs:right-8 xs:w-64 xs:rounded-lg xs:border fixed bottom-0 z-40 flex h-16 w-full items-center justify-center border-t backdrop-blur-md lg:top-20 lg:bottom-auto">
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
