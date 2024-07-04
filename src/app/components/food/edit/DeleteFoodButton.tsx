import { api } from "@/src/trpc/react";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

type DeleteFoodButtonProps = {
  id: string;
};

export function DeleteFoodButton({
  props: { id },
}: {
  props: DeleteFoodButtonProps;
}) {
  const deleteMutation = api.food.delete.useMutation();

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
