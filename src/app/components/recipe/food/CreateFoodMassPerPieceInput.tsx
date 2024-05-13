import { Input } from "@/src/lib/material";
import { Food } from "@/src/lib/types/Food";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const MAX_MASS_PER_PIECE = 1000;

const ERROR_MESSAGE =
  "La masse par unité doit être un nombre décimal entre 0.00 et 1000.00.";

type CreateFoodMassPerPieceInputProps = {
  register: UseFormRegister<Food>;
  errors: FieldErrors<Food>;
};
export function CreateFoodMassPerPieceInput({
  props: { register, errors },
}: {
  props: CreateFoodMassPerPieceInputProps;
}) {
  return (
    <>
      <Input
        crossOrigin=""
        id="create-food-mass-per-piece-input"
        labelProps={{ htmlFor: "create-food-mass-per-piece-input" }}
        label="Masse par unité (g)"
        placeholder="Masse par unité, entre 0.00 et 1000.00"
        {...register("massPerPiece", {
          min: {
            value: 0,
            message: ERROR_MESSAGE,
          },
          max: {
            value: MAX_MASS_PER_PIECE,
            message: ERROR_MESSAGE,
          },
          pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: ERROR_MESSAGE,
          },
        })}
      />
      {errors.massPerPiece && <div>{errors.massPerPiece.message}</div>}
    </>
  );
}
