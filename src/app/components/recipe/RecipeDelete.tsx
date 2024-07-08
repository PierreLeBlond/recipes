"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEditQuery } from "@/src/lib/hooks/useEditQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/src/app/components/ui/use-toast";
import { api } from "@/src/trpc/react";
import { getQueryKey } from "@trpc/react-query";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type RecipeDeleteProps = {
  id: string;
  name: string;
};

export function RecipeDelete({
  props: { id, name },
}: {
  props: RecipeDeleteProps;
}) {
  const session = useSession();
  const edit = useEditQuery(session.data);
  const router = useRouter();

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deleteMutation = api.recipe.delete.useMutation({
    onError: () => {
      toast({
        title: "Oh no...",
        description: `Impossible de supprimer '${name}'`,
      });
    },
    onSuccess: () => {
      toast({
        title: "Bye bye 👋",
        description: `'${name}' supprimé.`,
      });
      router.push("/recipes");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(api.recipe.list) });
    },
  });

  const { handleSubmit } = useForm();

  if (!edit) {
    return null;
  }

  const handleFormSubmit = async () => {
    await deleteMutation.mutateAsync({ id });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full items-center gap-4 rounded-md border border-error p-4 text-error"
    >
      <Button type="submit" variant="error">
        Supprimer ma recette
      </Button>
      Attention ! Cette action est irréversible.
    </form>
  );
}
