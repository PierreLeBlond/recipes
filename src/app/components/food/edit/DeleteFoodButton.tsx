import { api } from "@/src/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/src/app/components/ui/use-toast";

type DeleteFoodButtonProps = {
  id: string;
  name: string;
};

export function DeleteFoodButton({
  props: { id, name },
}: {
  props: DeleteFoodButtonProps;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deleteMutation = api.food.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(api.food.list) });
      toast({
        title: "Bye bye 👋",
        description: `'${name}' supprimé.`,
      });
    },
  });

  const { handleSubmit } = useForm();

  const handleFormSubmit = async () => {
    await deleteMutation.mutateAsync({ id });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <button
        type="submit"
        aria-label="delete"
        className="rounded-md p-2 text-error hover:bg-primary-foreground/10"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
