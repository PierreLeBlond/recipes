import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorAlert } from "@/src/app/components/utils/alert/ErrorAlert";
import { FormFood } from "./FormFood";
import { Input } from "../../ui/input";

const MAX_MASS_PER_PIECE = 1000;

const ERROR_MESSAGE =
  "La masse par unité doit être un nombre décimal entre 0.00 et 1000.00.";

type CreateFoodMassPerPieceInputProps = {
  register: UseFormRegister<FormFood>;
  errors: FieldErrors<FormFood>;
};
export function CreateFoodMassPerPieceInput({
  props: { register, errors },
}: {
  props: CreateFoodMassPerPieceInputProps;
}) {
  return (
    <>
      <Input
        label="Masse par unité (g)"
        placeholder="entre 0 et 1000, laisser vide si inconnue"
        variant="edit"
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

      {errors.massPerPiece && (
        <ErrorAlert>{errors.massPerPiece.message}</ErrorAlert>
      )}
    </>
  );
}
