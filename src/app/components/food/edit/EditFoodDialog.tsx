import { Dialog, DialogContent } from "@/src/app/components/ui/dialog";
import { Food } from "@/prisma/generated/client";
import { EditFood } from "./EditFood";

type EditFoodDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  food: Food;
};

export function EditFoodDialog({
  props: { open, setOpen, food },
}: {
  props: EditFoodDialogProps;
}) {
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="p-4 sm:p-8">
        <EditFood props={{ food }} />
      </DialogContent>
    </Dialog>
  );
}
