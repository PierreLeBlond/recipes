"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/src/app/components/ui/button";
import { Typography } from "@/src/app/components/ui/typography";
import { api } from "@/src/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/src/app/components/ui/use-toast";
import { getQueryKey } from "@trpc/react-query";
import { Food } from "@/prisma/generated/client";
import { CreateFoodNameInput } from "../create/CreateFoodNameInput";
import { CreateFoodDensityInput } from "../create/CreateFoodDensityInput";
import { CreateFoodMassPerPieceInput } from "../create/CreateFoodMassPerPieceInput";
import { FormFood } from "../create/FormFood";
import { CreateFoodUnitInput } from "../create/CreateFoodUnitInput";

type EditFoodProps = {
  food: Food;
};

export function EditFood({ props: { food } }: { props: EditFoodProps }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty, errors },
  } = useForm<FormFood>({
    defaultValues: {
      name: food.name,
      unit: food.unit,
      density: food.density?.toString() || "",
      massPerPiece: food.massPerPiece?.toString() || "",
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const queryKey = getQueryKey(api.food.list);
  const updateMutation = api.food.update.useMutation({
    onError: (_, { name }) => {
      toast({
        title: "Oh no...",
        description: `Impossible de modifier '${name}'`,
      });
    },
    onSuccess: ({ name }) => {
      toast({
        title: "Compris chef !",
        description: `'${name}' modifié.`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleFormSubmit = async (formFood: FormFood) => {
    updateMutation.mutate({
      id: food.id,
      name: formFood.name,
      density: formFood.density ? parseFloat(formFood.density) : null,
      massPerPiece: formFood.massPerPiece
        ? parseFloat(formFood.massPerPiece)
        : null,
      unit: formFood.unit,
    });
  };

  return (
    <div className="flex w-full flex-col gap-8 px-4 xs:p-0">
      <Typography variant="h3">Modifier un aliment</Typography>
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
            MODIFIER
          </Button>
        </div>
      </form>
    </div>
  );
}
