import Link from "next/link";
import { Card, CardHeader, CardBody, Typography } from "@/src/lib/material";

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
      <Card className="h-full w-full flex-col justify-end overflow-hidden transition-shadow hover:shadow-lg hover:shadow-gray-500/50">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
        </CardHeader>
        <CardBody className="relative">
          <Typography variant="h3" className="text-start !text-blue-gray-50">
            {name}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
}
