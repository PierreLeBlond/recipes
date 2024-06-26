import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorAlert } from "@/src/app/components/utils/alert/ErrorAlert";
import { Input } from "@/src/app/components/ui/input";
import { FormFood } from "./FormFood";

const ROUNDED_OSMIUM_DENSITY = 23;

type CreateFoodDesityInputProps = {
  register: UseFormRegister<FormFood>;
  errors: FieldErrors<FormFood>;
};
export function CreateFoodDensityInput({
  props: { register, errors },
}: {
  props: CreateFoodDesityInputProps;
}) {
  return (
    <>
      <Input
        label="Densité (g/cm³)"
        placeholder="entre 0 et 23, laisser vide si inconnue"
        variant="edit"
        {...register("density", {
          min: {
            value: 0,
            message:
              "La densité doit être un nombre décimal entre 0.00 et 23.00.",
          },
          max: {
            value: ROUNDED_OSMIUM_DENSITY,
            message:
              "La densité doit être un nombre décimal entre 0.00 et 23.00.",
          },
          pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message:
              "La densité doit être un nombre décimal entre 0.00 et 23.00.",
          },
        })}
      />
      {errors.density && <ErrorAlert>{errors.density.message}</ErrorAlert>}
    </>
  );
}
