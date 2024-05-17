import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Select, Option } from "@/src/lib/material";
import { ErrorAlert } from "@/src/app/components/utils/alert/ErrorAlert";
import { FormFood } from "./FormFood";

type CreateFoodUnitInputProps = {
  register: UseFormRegister<FormFood>;
  errors: FieldErrors<FormFood>;
};

export function CreateFoodUnitInput({
  props: { register, errors },
}: {
  props: CreateFoodUnitInputProps;
}) {
  const { onChange, ...rest } = register("unit", {
    required: "Une unité doit être sélectionnée.",
  });
  return (
    <>
      <Select
        onChange={(value) => {
          onChange({ target: { value, name: "unit" } });
        }}
        {...rest}
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
  );
}
