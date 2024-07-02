import { cn } from "@/src/lib/utils";

type Ingredient = {
  food: {
    name: string;
  };
};

type ReferencesListProps = {
  ingredients: Ingredient[];
  highlightedName: string | null;
};

export function ReferencesList({
  props: { ingredients, highlightedName },
  onIngredientReferenceSelected,
}: {
  props: ReferencesListProps;
  onIngredientReferenceSelected: (ingredientName: string) => void;
}) {
  if (ingredients.length === 0) {
    return null;
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
    <ul className="min-w-auto relative flex flex-col gap-2 rounded-t-md rounded-br-md bg-primary p-2 shadow-md">
      {ingredients.map((ingredient) => (
        <li key={ingredient.food.name}>
          <button
            className={cn(
              "flex w-full items-center text-nowrap rounded-md p-1 px-2 text-edit hover:bg-primary-foreground/10",
              {
                "selected bg-primary-foreground/10":
                  highlightedName === ingredient.food.name,
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
