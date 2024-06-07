import { useFormContext, useWatch } from "react-hook-form";
import { Title } from "@/src/app/components/utils/Title";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { cn } from "@/src/lib/utils";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { Input } from "../../ui/input";

export function RecipeName() {
  const { edit } = useQueryState();
  const name = useWatch({
    name: "name",
  });
  const { register } = useFormContext<FormInputs>();

  return (
    <div className="flex h-full max-w-full flex-col justify-between gap-2 overflow-hidden">
      <Title props={{ title: name }} />

      <div
        className={cn("transition-all duration-300", {
          "pointer-events-none !h-0 translate-y-10 opacity-0 lg:!h-10 lg:translate-x-40 lg:translate-y-0":
            !edit,
        })}
      >
        <Input
          disabled={!edit}
          label="Nom de la recette, entre 3 et 33 caractères"
          variant="edit"
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
        />
      </div>
    </div>
  );
}
