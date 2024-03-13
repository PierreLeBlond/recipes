import Image from "next/image";
import Link from "next/link";
import { CookingPot } from "lucide-react";

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
    <Link
      className="relative h-full w-full rounded-3xl border border-gray-900 text-start shadow-fly transition-all duration-75 hover:-translate-y-1 hover:shadow-high"
      href={`recipes/${id}`}
    >
      <div className="relative flex h-4/6 items-center justify-center overflow-hidden border-b border-gray-900 shadow-inner">
        {image ? (
          <Image
            src={image}
            alt={name || "Image de la recette"}
            fill={true}
            className="rounded-t-3xl object-cover"
          />
        ) : (
          <CookingPot size={96} className="text-gray-500"></CookingPot>
        )}
      </div>
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-bold">{name}</h3>
      </div>
    </Link>
  );
}
