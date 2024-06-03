import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@/src/lib/material";
import { api } from "@/src/trpc/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { SuccessAlert } from "@/src/app/components/utils/alert/SuccessAlert";

type CreateRecipeDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type CreateRecipeFormInputs = {
  name: string;
};

export function CreateRecipeDialog({
  props: { open, setOpen },
}: {
  props: CreateRecipeDialogProps;
}) {
  const createMutation = api.recipe.create.useMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<CreateRecipeFormInputs>({
    defaultValues: {
      name: "",
    },
  });

  const handleOpen = () => {
    setOpen(!open);
    createMutation.reset();
  };

  const onSubmit: SubmitHandler<CreateRecipeFormInputs> = (data) => {
    createMutation.mutate(data);
    reset();
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      color="blue-gray"
      className="p-4 sm:p-8"
    >
      <DialogHeader className="w-full justify-center text-sm">
        Création de recette
      </DialogHeader>
      <DialogBody>
        {createMutation.isIdle && (
          <form id="createRecipeForm" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nom de la recette"
              {...register("name", {
                required:
                  "Un nom de recette est obligatoire, entre 3 et 33 caractères",
                minLength: {
                  value: 3,
                  message:
                    "Le nom de la recette doit faire au moins 3 caractères",
                },
                maxLength: {
                  value: 33,
                  message:
                    "Le nom de la recette doit faire au plus 33 caractères",
                },
              })}
            />
          </form>
        )}
        {createMutation.isPending && <div>Création de la recette...</div>}
        {createMutation.isError && (
          <div>Erreur lors de la création de la recette</div>
        )}
        {createMutation.isSuccess && (
          <SuccessAlert>Recette créée !</SuccessAlert>
        )}
      </DialogBody>
      <DialogFooter className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Button
          color="gray"
          onClick={() => {
            setOpen(false);
          }}
          className="lg:col-start-3"
          variant="text"
        >
          Quitter
        </Button>
        {createMutation.isIdle ? (
          <Button
            type="submit"
            disabled={!isDirty}
            color="blue-gray"
            variant="filled"
            form="createRecipeForm"
            className="lg:col-start-4"
          >
            Créer
          </Button>
        ) : (
          <Button
            disabled={!createMutation.isSuccess}
            color="brown"
            className="lg:col-start-4"
          >
            <Link href={`/recipes/${createMutation.data?.id}?edit=true`}>
              Éditer
            </Link>
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
