import { useState } from "react";
import { Button } from "@/src/app/components/ui/button";
import { useSession } from "next-auth/react";
import { CreateFoodDialog } from "./CreateFoodDialog";

export function CreateFoodButton() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const canEditFood = session.data?.user.role === "ADMIN";

  if (!canEditFood) {
    return null;
  }

  return (
    <>
      <Button
        className="w-full rounded-none xs:rounded-b-none xs:rounded-t-xl"
        onClick={() => setOpen(true)}
        variant="edit"
        type="button"
      >
        Ajouter un aliment
      </Button>
      <CreateFoodDialog props={{ open, setOpen }} />
    </>
  );
}
