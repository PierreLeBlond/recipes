import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorAlert } from "@/src/app/components/utils/alert/ErrorAlert";
import { ChevronDown } from "lucide-react";
import { FormFood } from "./FormFood";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type CreateFoodUnitInputProps = {
  control: Control<FormFood>;
  errors: FieldErrors<FormFood>;
};

export function CreateFoodUnitInput({
  props: { control, errors },
}: {
  props: CreateFoodUnitInputProps;
}) {
  return (
    <Controller
      control={control}
      name="unit"
      rules={{
        required: "Une unité doit être sélectionnée.",
      }}
      render={({ field: { onChange, value } }) => (
        <>
          <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger
              variant="edit"
              label="Unité de mesure"
              icon={<ChevronDown size={24} />}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GRAM">g (gramme)</SelectItem>
              <SelectItem value="LITER">l (litre)</SelectItem>
              <SelectItem value="TEASPOON">c.a.c. (cuillère à café)</SelectItem>
              <SelectItem value="TABLESPOON">
                c.a.s. (cuillère à soupe)
              </SelectItem>
              <SelectItem value="PIECE">pièce</SelectItem>
              <SelectItem value="PINCH">pincée</SelectItem>
              <SelectItem value="DROP">goutte</SelectItem>
            </SelectContent>
          </Select>
          {errors.unit && <ErrorAlert>{errors.unit.message}</ErrorAlert>}
        </>
      )}
    />
  );
}
