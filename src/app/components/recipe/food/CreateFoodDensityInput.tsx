import { Alert, Input } from "@/src/lib/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFood } from "./FormFood";
import { Ambulance } from "lucide-react";

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
        crossOrigin=""
        id="create-food-density-input"
        labelProps={{ htmlFor: "create-food-density-input" }}
        label="Densité (g/cm³)"
        placeholder="Densité, entre 0.00 et 23.00, laisser vide si inconnue"
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
      {errors.density && (
        <Alert icon={<Ambulance></Ambulance>} color="red">
          {errors.density.message}
        </Alert>
      )}
    </>
  );
}
