import { UseFormRegister } from "react-hook-form";
import { FormFood } from "./FormFood";

type CreateFoodUnitInputProps = {
  register: UseFormRegister<FormFood>;
};

export const CreateFoodUnitInput = ({
  props: { register },
}: {
  props: CreateFoodUnitInputProps;
}) => {
  return (
    <label>
      Unité de mesure
      <select {...register("unit")}>
        <option value="GRAM">g (gramme)</option>
        <option value="LITER">l (litre)</option>
        <option value="TEASPOON">c.a.c. (cuillère à café)</option>
        <option value="TABLESPOON">c.a.s. (cuillère à soupe)</option>
        <option value="PIECE">pièce</option>
        <option value="PINCH">pincée</option>
        <option value="DROP">goutte</option>
      </select>
    </label>
  );
};
