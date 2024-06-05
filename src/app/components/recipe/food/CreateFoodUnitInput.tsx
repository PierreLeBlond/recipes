import { Control, Controller, FieldErrors } from "react-hook-form";
import { Select, Option } from "@/src/lib/material";
import { ErrorAlert } from "@/src/app/components/utils/alert/ErrorAlert";
import { FormFood } from "./FormFood";

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
      render={({ field: { onChange } }) => (
        <>
          <Select
            onChange={onChange}
            label="Unité de mesure"
            id="create-food-unit-input"
            labelProps={{ htmlFor: "create-food-unit-input" }}
            color="blue-gray"
          >
            <Option value="GRAM">g (gramme)</Option>
            <Option value="LITER">l (litre)</Option>
            <Option value="TEASPOON">c.a.c. (cuillère à café)</Option>
            <Option value="TABLESPOON">c.a.s. (cuillère à soupe)</Option>
            <Option value="PIECE">pièce</Option>
            <Option value="PINCH">pincée</Option>
            <Option value="DROP">goutte</Option>
          </Select>
          {errors.unit && <ErrorAlert>{errors.unit.message}</ErrorAlert>}
        </>
      )}
     />
  );
}
