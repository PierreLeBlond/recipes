import { Pencil } from "lucide-react";
import { Food } from "@/prisma/generated/client";
import { useState } from "react";
import { EditFoodDialog } from "./EditFoodDialog";

type EditFoodButtonProps = {
  food: Food;
};

export function EditFoodButton({
  props: { food },
}: {
  props: EditFoodButtonProps;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="edit"
        className="rounded-md p-2 hover:bg-primary-foreground/10"
        onClick={() => setOpen(true)}
      >
        <Pencil size={16} />
      </button>
      <EditFoodDialog props={{ open, setOpen, food }} />
    </>
  );
}
