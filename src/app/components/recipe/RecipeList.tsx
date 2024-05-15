import { api } from "@/src/trpc/react";
import { Button, Spinner } from "@/src/lib/material";
import { useSession } from "next-auth/react";
import { ServerCrash } from "lucide-react";
import { RecipeCard } from "./RecipeCard";
import { CreateRecipeCard } from "./create/CreateRecipeCard";

type RecipeListProps = {
  search: string;
};

export function RecipeList({ props: { search } }: { props: RecipeListProps }) {
  const session = useSession();

  const { status, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.recipe.list.useInfiniteQuery(
      { search, limit: 6 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  if (status === "loading") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <Spinner color="blue-gray" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <ServerCrash className="text-red-500" />
      </div>
    );
  }

  const isAdmin = session.data?.user?.role === "ADMIN";

  const recipeList = data
    ? data.pages
        .flatMap((page) => page.recipes)
        .map((recipe) => (
          <li className="flex aspect-square justify-center" key={recipe.id}>
            <RecipeCard props={recipe} />
          </li>
        ))
    : [];

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {isAdmin && (
        <li
          className="relative flex h-12 justify-center sm:aspect-square sm:h-auto"
          key="createCard"
        >
          <CreateRecipeCard />
        </li>
      )}
      {recipeList}
      {hasNextPage && (
        <div className="flex w-full justify-center sm:col-span-2 lg:col-span-3">
          <Button
            onClick={() => !isFetchingNextPage && fetchNextPage()}
            disabled={isFetchingNextPage}
            className="w-full"
          >
            {isFetchingNextPage ? "Chargement..." : "Afficher plus de recettes"}
          </Button>
        </div>
      )}
    </ul>
  );
}
