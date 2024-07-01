import { Button } from "@/src/app/components/ui/button";

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
      type="button"
      onPointerDown={(e) => e.preventDefault()}
      onPointerUp={handleClickedButton}
      className="flex h-8 items-center justify-center gap-2 p-1 px-2 text-xl font-bold"
      variant="edit"
    >
      #
    </Button>
  );
}
