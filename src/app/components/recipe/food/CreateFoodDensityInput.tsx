import { Input } from "@/src/lib/material";
import { Food } from "@/src/lib/types/Food";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const ROUNDED_OSMIUM_DENSITY = 23;

type CreateFoodDesityInputProps = {
  register: UseFormRegister<Food>;
  errors: FieldErrors<Food>;
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
        label="Densité (g/l)"
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
      {errors.density && <div>{errors.density.message}</div>}
    </>
  );
}
