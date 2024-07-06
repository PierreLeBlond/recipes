"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/src/app/components/ui/button";
import { Typography } from "@/src/app/components/ui/typography";
import { ErrorAlert } from "@/src/app/components/utils/alert/ErrorAlert";
import { api } from "@/src/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/src/app/components/ui/use-toast";
import { getQueryKey } from "@trpc/react-query";
import { useSession } from "next-auth/react";
import { CreateFoodNameInput } from "./CreateFoodNameInput";
import { CreateFoodDensityInput } from "./CreateFoodDensityInput";
import { CreateFoodMassPerPieceInput } from "./CreateFoodMassPerPieceInput";
import { FormFood } from "./FormFood";
import { CreateFoodUnitInput } from "./CreateFoodUnitInput";

export function CreateFood() {
  const session = useSession();
  const canCreateFood = session.data?.user.role === "ADMIN";

  const {
    handleSubmit,
    register,
    control,
    resetField,
    formState: { isDirty, errors },
  } = useForm<FormFood>({
    defaultValues: {
      name: "",
      density: "",
      massPerPiece: "",
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const queryKey = getQueryKey(api.food.list);
  const createMutation = api.food.create.useMutation({
    onError: (_, { name }) => {
      toast({
        title: "Oh no...",
        description: `Impossible de créer '${name}'`,
      });
    },
    onSuccess: ({ name }) => {
      resetField("name");
      resetField("density");
      resetField("massPerPiece");
      toast({
        title: "Un de plus !",
        description: `'${name}' créé.`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleFormSubmit = async (food: FormFood) => {
    createMutation.mutate({
      name: food.name,
      density: food.density ? parseFloat(food.density) : null,
      massPerPiece: food.massPerPiece ? parseFloat(food.massPerPiece) : null,
      unit: food.unit,
    });
  };

  return (
    <div className="flex w-full flex-col gap-8 px-4 xs:p-0">
      <Typography variant="h3">Ajouter un aliment</Typography>
      {canCreateFood ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <CreateFoodNameInput props={{ register, errors }} />
          <CreateFoodUnitInput props={{ control, errors }} />
          <CreateFoodDensityInput props={{ register, errors }} />
          <CreateFoodMassPerPieceInput props={{ register, errors }} />
          <div className="flex justify-end">
            <Button type="submit" variant="edit" disabled={!isDirty}>
              AJOUTER
            </Button>
          </div>
        </form>
      ) : (
        <ErrorAlert>Fonctionnalité réservé aux administrateurs</ErrorAlert>
      )}
    </div>
  );
}
