import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorAlert } from "@/src/app/components/utils/alert/ErrorAlert";
import { Input } from "@/src/app/components/ui/input";
import { FormFood } from "./FormFood";

type CreateFoodInputProps = {
  register: UseFormRegister<FormFood>;
  errors: FieldErrors<FormFood>;
};

export function CreateFoodNameInput({
  props: { register, errors },
}: {
  props: CreateFoodInputProps;
}) {
  return (
    <>
      <Input
        label="Nom de l'aliment"
        placeholder="Nom de l'aliment"
        variant="edit"
        {...register("name", {
          required: "Le nom doit comporter de 3 et 33 caractères.",
          minLength: {
            value: 3,
            message: "Le nom doit comporter de 3 et 33 caractères.",
          },
          maxLength: {
            value: 33,
            message: "Le nom doit comporter de 3 et 33 caractères.",
          },
          pattern: {
            value: /^[a-zA-ZÀ-ÿ\s']+$/,
            message:
              "Le nom ne doit comporter que des lettres, des espaces, et des apostrophes.",
          },
        })}
      />
      {errors.name && <ErrorAlert>{errors.name.message}</ErrorAlert>}
    </>
  );
}
