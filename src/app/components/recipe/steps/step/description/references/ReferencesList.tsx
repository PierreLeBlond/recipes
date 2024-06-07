import { List, ListItem } from "@/src/lib/material";
import { cn } from "@/src/lib/utils";
import { Typography } from "@material-tailwind/react";

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
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();

    if (!onIngredientReferenceSelected) {
      return;
    }

    onIngredientReferenceSelected(e.currentTarget.textContent || "");
  };

  return (
    <List className="min-w-auto relative h-12 flex-row p-2 lg:w-1/3">
      {ingredients.map((ingredient) => (
        <ListItem
          className={cn("w-auto p-1 px-2", {
            selected: selectedReference === ingredient.food.name,
          })}
          role="button"
          onPointerDown={handleIngredientReferenceSelected}
          key={ingredient.food.name}
          selected={selectedReference === ingredient.food.name}
        >
          {ingredient.food.name}
        </ListItem>
      ))}
    </List>
  );
}
