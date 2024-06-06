import { Button } from "@/src/app/components/ui/button";
import { Hash } from "lucide-react";

type ReferencesButtonProps = {
  description: string;
  caretPosition: number;
};

export function ReferencesButton({
  props: { description, caretPosition },
  onChangedDescription,
}: {
  props: ReferencesButtonProps;
  onChangedDescription: (_: {
    description: string;
    caretPosition: number;
  }) => void;
}) {
  const handleClickedButton = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!onChangedDescription) {
      return;
    }

    const descriptionStart = description.substring(0, caretPosition);

    const descriptionEnd = description.substring(caretPosition);

    onChangedDescription({
      description: `${descriptionStart}#${descriptionEnd}`,
      caretPosition: caretPosition + 1,
    });
  };
  return (
    <Button
      onPointerDown={handleClickedButton}
      className="flex items-center justify-center gap-2 border-0"
      variant="edit"
      size="sm"
    >
      <Hash size={16} /> AJOUTER UN INGRÉDIENT
    </Button>
  );
}
