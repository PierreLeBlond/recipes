import Image from "next/image";
import Link from "next/link";

type RecipeCardProps = {
  image: string;
  name: string;
  description: string | null;
  id: number;
};

export function RecipeCard({ props }: { props: RecipeCardProps }) {
  return (
    <Link
      className="h-full w-full rounded-3xl bg-gradient-to-br from-white to-gray-300 text-start text-gray-900 shadow-pop"
      href={`recipe/${props.id}`}
    >
      <div className="relative h-4/6 overflow-hidden">
        <Image
          src={props.image}
          alt={props.name}
          fill={true}
          className="rounded-t-3xl object-cover shadow-inner"
        />
      </div>
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-bold">{props.name}</h3>
        {props.description && (
          <p className="text-xs text-gray-800">{props.description}</p>
        )}
      </div>
    </Link>
  );
}
