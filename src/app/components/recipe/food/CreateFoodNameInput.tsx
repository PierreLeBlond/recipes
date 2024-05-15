import { Input } from "@/src/lib/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFood } from "./FormFood";
import { Food } from "@/src/lib/types/Food";

type CreateFoodInputProps = {
  register: UseFormRegister<FormFood>;
  errors: FieldErrors<FormFood>;
  foods: Food[];
};

export function CreateFoodNameInput({
  props: { register, errors, foods },
}: {
  props: CreateFoodInputProps;
}) {
  return (
    <>
      <Input
        crossOrigin=""
        label="Nom de l'aliment"
        placeholder="Nom de l'aliment"
        id="create-food-name-input"
        labelProps={{ htmlFor: "create-food-name-input" }}
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
          validate: (name: string) =>
            !foods.some((food) => food.name === name) ||
            "Cet aliment existe déjà.",
        })}
      />
      {errors.name && <div>{errors.name.message}</div>}
    </>
  );
}
