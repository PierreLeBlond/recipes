import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/src/lib/material";
import { useState } from "react";
import { Food } from "@/src/lib/types/Food";
import { Button } from "@/src/app/components/ui/button";
import { FoodPicker } from "./FoodPicker";

type FoodPickerDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handlePickedFoods: (pickedFoods: Food[]) => void;
  disabledFoods: Food[];
};

export function FoodPickerDialog({
  props: { open, setOpen, handlePickedFoods, disabledFoods },
}: {
  props: FoodPickerDialogProps;
}) {
  const [pickedFoods, setPickedFoods] = useState<Food[]>([]);

  const handleOpen = () => setOpen(!open);

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      color="blue-gray"
      className="h-full"
    >
      <DialogHeader className="w-full justify-center text-sm">
        Ajout d&apos;ingrédients
      </DialogHeader>
      <DialogBody>
        <FoodPicker props={{ pickedFoods, setPickedFoods, disabledFoods }} />
      </DialogBody>
      <DialogFooter className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => {
            setOpen(false);
          }}
          className="w-full"
        >
          QUITTER
        </Button>
        <Button
          disabled={pickedFoods.length === 0}
          onClick={() => {
            handlePickedFoods(pickedFoods);
            setOpen(false);
            setPickedFoods([]);
          }}
          className="w-full"
          color="blue-gray"
        >
          AJOUTER CES INGRÉDIENTS
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
