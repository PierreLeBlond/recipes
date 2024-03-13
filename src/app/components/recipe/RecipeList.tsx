import { api } from "@/src/trpc/react";
import { RecipeCard } from "./RecipeCard";
import { Button, Spinner } from "@/src/lib/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { PlusCircle, ServerCrash } from "lucide-react";

type RecipeListProps = {
  search: string;
};

export function RecipeList({ props: { search } }: { props: RecipeListProps }) {
  const session = useSession();

  const { status, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.recipe.list.useInfiniteQuery(
      { search, limit: 1 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  if (status === "loading") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <Spinner className="text-orange-500"></Spinner>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <ServerCrash className="text-red-500"></ServerCrash>
      </div>
    );
  }

  const recipeList = data
    ? data.pages
        .flatMap((page) => page.recipes)
        .map((recipe) => (
          <div className="flex h-72 w-full justify-center" key={recipe.id}>
            <div className="flex aspect-square max-w-xs justify-center p-4">
              <RecipeCard props={recipe} />
            </div>
          </div>
        ))
    : [];

  return (
    <>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 text-center md:grid-cols-2 lg:grid-cols-3">
        {session.data?.user?.role === "ADMIN" && (
          <div className="flex h-72 w-full justify-center">
            <div className="flex aspect-square max-w-xs justify-center p-4">
              <Link
                className="hover:shadow-high relative flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-3xl border border-gray-900 text-start shadow-fly transition-all duration-75 hover:-translate-y-1"
                href={`recipes/create`}
              >
                <PlusCircle size={48}></PlusCircle>Ajouter une recette
              </Link>
            </div>
          </div>
        )}
        {recipeList}
      </div>
      <Button
        onClick={() => !isFetchingNextPage && fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
        className="w-full md:w-1/2 lg:w-1/3"
        color="white"
      >
        {isFetchingNextPage
          ? "Chargement..."
          : hasNextPage
            ? "Afficher plus de recettes"
            : "Pas d'autres recettes à afficher"}
      </Button>
    </>
  );
}
