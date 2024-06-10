import { useState } from "react";
import { Food } from "@/src/lib/types/Food";
import { Button } from "@/src/app/components/ui/button";
import { FoodPicker } from "./FoodPicker";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Typography } from "../../ui/typography";

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
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="h-5/6">
        <Typography variant="h3">Ajout d&apos;ingrédients</Typography>
        <FoodPicker props={{ pickedFoods, setPickedFoods, disabledFoods }} />
        <div className="flex justify-end">
          <Button
            disabled={pickedFoods.length === 0}
            onClick={() => {
              handlePickedFoods(pickedFoods);
              setOpen(false);
              setPickedFoods([]);
            }}
            className="w-full sm:w-1/2"
            variant="edit"
          >
            AJOUTER CES INGRÉDIENTS
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
