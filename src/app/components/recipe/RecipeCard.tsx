import Link from "next/link";
import { cn } from "@/src/lib/utils";
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
      <Card className="relative h-full w-full flex-col justify-end overflow-hidden rounded-none xs:rounded-lg">
        <CardContent
          className="absolute inset-0 m-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div
            className={cn("absolute inset-0 h-full w-full", {
              "bg-linear-to-t from-primary-foreground/90 via-primary-foreground/60 to-primary-foreground/0":
                image,
              "bg-primary-foreground/90": !image,
            })}
          />
        </CardContent>
        <CardFooter className="relative flex h-full flex-col items-start justify-end">
          <Typography variant="h2" className="text-primary">
            {name}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
}
