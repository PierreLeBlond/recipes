import { UseFormRegister } from "react-hook-form";
import { FormFood } from "./FormFood";
import { Select, Option } from "@/src/lib/material";

type CreateFoodUnitInputProps = {
  register: UseFormRegister<FormFood>;
};

export const CreateFoodUnitInput = ({
  props: { register },
}: {
  props: CreateFoodUnitInputProps;
}) => {
  const { onChange, ...rest } = register("unit");
  return (
    <Select
      onChange={(value) => {
        onChange({ target: { value, name: "unit" } });
      }}
      value={"GRAM"}
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
  );
};
