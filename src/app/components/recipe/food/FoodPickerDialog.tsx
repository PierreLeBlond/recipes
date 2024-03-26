import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/src/lib/material";
import { useState } from "react";
import { FoodPicker } from "./FoodPicker";
import { Food } from "@/prisma/generated/client";

type FoodPickerDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handlePickedFoods: (pickedFoods: Food[]) => void;
  disabledFoods: Food[];
};

export const FoodPickerDialog = ({
  props: { open, setOpen, handlePickedFoods, disabledFoods },
}: {
  props: FoodPickerDialogProps;
}) => {
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
        Ajout d'ingrédients
      </DialogHeader>
      <DialogBody>
        <FoodPicker
          props={{ pickedFoods, setPickedFoods, disabledFoods }}
        ></FoodPicker>
      </DialogBody>
      <DialogFooter className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => {
            setOpen(false);
          }}
          variant={"text"}
          className="w-full"
        >
          Quitter
        </Button>
        <Button
          disabled={pickedFoods.length === 0}
          onClick={() => {
            handlePickedFoods(pickedFoods);
            setOpen(false);
            setPickedFoods([]);
          }}
          className="w-full"
          variant={"filled"}
          color="blue-gray"
        >
          Ajouter ces ingrédients
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
