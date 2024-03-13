import { Control, Controller } from "react-hook-form";
import { RecipePlateCount } from "@/src/app/components/recipe/RecipePlateCount";
import { FormInputs } from "./FormInputs";

type PlateCountEditProps = {
  control: Control<FormInputs>;
};

export const PlateCountEdit = ({
  props: { control },
}: {
  props: PlateCountEditProps;
}) => {
  return (
    <Controller
      name="plateCount"
      control={control}
      rules={{ required: true, min: 1, max: 100 }}
      render={({ field }) => (
        <RecipePlateCount
          props={{
            plateCount: field.value,
            handlePlateCountChange: (count) =>
              field.onChange(field.value + count),
          }}
        ></RecipePlateCount>
      )}
    ></Controller>
  );
};
