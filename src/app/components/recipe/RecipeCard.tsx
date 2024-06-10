import Link from "next/link";
import { Typography } from "../ui/typography";
import { Card, CardContent, CardFooter } from "../ui/card";

type RecipeCardProps = {
  image: string | null;
  name: string;
  id: string;
};

export function RecipeCard({
  props: { image, name, id },
}: {
  props: RecipeCardProps;
}) {
  return (
    <Link className="relative h-full w-full" href={`recipes/${id}`}>
      <Card className="relative h-full w-full flex-col justify-end overflow-hidden">
        <CardContent
          className="absolute inset-0 m-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-primary-foreground/80 via-primary-foreground/50 to-primary-foreground/10" />
        </CardContent>
        <CardFooter className="relative flex h-full flex-col items-start justify-end">
          <Typography variant="h2" className="text-secondary-foreground">
            {name}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
}
