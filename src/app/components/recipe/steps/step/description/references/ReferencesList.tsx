import { Typography } from "@/src/app/components/ui/typography";
import { cn } from "@/src/lib/utils";

type Ingredient = {
  food: {
    name: string;
  };
};

type ReferencesListProps = {
  ingredients: Ingredient[];
  selectedReference: string;
};

export function ReferencesList({
  props: { ingredients, selectedReference },
  onIngredientReferenceSelected,
}: {
  props: ReferencesListProps;
  onIngredientReferenceSelected: (ingredientName: string) => void;
}) {
  if (ingredients.length === 0) {
    return (
      <Typography className="relative min-w-0 lg:w-1/3">
        Pas d&apos;ingrédients correspondants
      </Typography>
    );
  }

  const handleIngredientReferenceSelected = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (!onIngredientReferenceSelected) {
      return;
    }

    onIngredientReferenceSelected(e.currentTarget.textContent || "");
  };

  return (
    <ul className="min-w-auto relative flex gap-2 overflow-x-scroll">
      {ingredients.map((ingredient) => (
        <li key={ingredient.food.name}>
          <button
            className={cn(
              "flex items-center justify-center text-nowrap rounded-md border border-edit p-1 px-2 text-edit hover:font-bold",
              {
                selected: selectedReference === ingredient.food.name,
              },
            )}
            type="button"
            onPointerUp={handleIngredientReferenceSelected}
            onPointerDown={(e) => e.preventDefault()}
          >
            {ingredient.food.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
