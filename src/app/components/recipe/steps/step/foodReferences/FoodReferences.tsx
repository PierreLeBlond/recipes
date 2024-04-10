type FoodReferencesProps = {
  foods: { name: string }[];
};

export const FoodReferences = ({
  props: { foods },
  onFoodReferenceSelected,
}: {
  props: FoodReferencesProps;
  onFoodReferenceSelected?: (foodName: string) => void;
}) => {
  if (foods.length === 0) {
    return <p>Pas d'ingrédients correspondants</p>;
  }

  const handleFoodReferenceSelected = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    if (!onFoodReferenceSelected) {
      return;
    }

    onFoodReferenceSelected(e.currentTarget.textContent || "");
  };

  return (
    <ul>
      {foods.map((food) => (
        <li
          role="button"
          onPointerDown={handleFoodReferenceSelected}
          key={food.name}
        >
          {food.name}
        </li>
      ))}
    </ul>
  );
};
