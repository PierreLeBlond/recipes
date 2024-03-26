import { useFormContext, useWatch } from "react-hook-form";
import { Title } from "@/src/app/components/utils/Title";
import { Input } from "@/src/lib/material";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { cn } from "@/src/lib/utils";
import { useQueryState } from "@/src/lib/hooks/useQueryState";

export const RecipeName = () => {
  const { edit } = useQueryState();
  const name = useWatch({
    name: "name",
  });
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

  return (
    <div className="flex h-full max-w-full flex-col justify-between gap-2 overflow-hidden">
      <Title props={{ title: name }}></Title>

      <Input
        crossOrigin={""}
        disabled={!edit}
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
        color="blue-gray"
        containerProps={{
          className: cn("transition-all duration-300", {
            "translate-y-10 !h-0 lg:translate-y-0 lg:!h-10 lg:translate-x-40 opacity-0 pointer-events-none":
              !edit,
          }),
        }}
      ></Input>
    </div>
  );
};
