import {
  Control,
  Field,
  FieldError,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { FormInputs } from "./FormInputs";
import { Title } from "@/src/app/components/utils/Title";
import { Input } from "@/src/lib/material";
import { Recipe } from "@/prisma/generated/client";

type NameEditProps = {
  control: Control<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  recipe: Recipe | null;
};

export const NameEdit = ({
  props: { control, recipe, register, errors },
}: {
  props: NameEditProps;
}) => {
  const name = useWatch({
    control,
    name: "name",
    defaultValue: recipe ? recipe.name : "",
  });

  return (
    <>
      <Title props={{ title: name }}></Title>

      <Input
        crossOrigin={""}
        label={
          errors.name?.message || "Nom de la recette, entre 3 et 33 caractères"
        }
        error={!!errors.name}
        {...register("name", {
          required:
            "Un nom de recette est obligatoire, entre 3 et 33 caractères",
          minLength: {
            value: 3,
            message: "Le nom de la recette doit faire au moins 3 caractères",
          },
          maxLength: {
            value: 33,
            message: "Le nom de la recette doit faire au plus 33 caractères",
          },
        })}
      ></Input>
    </>
  );
};
