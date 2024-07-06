import { Dialog, DialogContent } from "../../ui/dialog";
import { CreateFood } from "./CreateFood";

type CreateFoodDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CreateFoodDialog({
  props: { open, setOpen },
}: {
  props: CreateFoodDialogProps;
}) {
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="p-4 sm:p-8">
        <CreateFood />
      </DialogContent>
    </Dialog>
  );
}
