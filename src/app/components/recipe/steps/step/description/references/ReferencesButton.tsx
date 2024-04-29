import { Button } from "@/src/lib/material";
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
      className="flex h-10 items-center justify-center gap-2 border-0"
    >
      <Hash size={16} /> Ajouter un ingrédient
    </Button>
  );
}
