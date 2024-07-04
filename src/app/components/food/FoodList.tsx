"use client";

import { api } from "@/src/trpc/react";
import { LoaderCircle, ServerCrash } from "lucide-react";
import { FoodItem } from "./FoodItem";

type FoodListProps = {
  search: string;
};

export function FoodList({ props: { search } }: { props: FoodListProps }) {
  const { status, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.food.list.useInfiniteQuery(
      { search, limit: 50 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  if (status === "pending") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <LoaderCircle className="animate-spin text-edit" />
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex h-72 w-full items-center justify-center">
        <ServerCrash className="text-error" />
      </div>
    );
  }

  const foodList = data
    ? data.pages
        .flatMap((page) => page.foods)
        .map((food) => (
          <li key={food.id}>
            <FoodItem key={food.id} props={{ food }} />
          </li>
        ))
    : [];

  return (
    <>
      <ul className="flex flex-col gap-2 shadow-lg">{foodList}</ul>
      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage && "Chargement..."}
          {!isFetchingNextPage && hasNextPage && "Charger plus"}
          {!isFetchingNextPage && !hasNextPage && "C'est tout !"}
        </button>
      )}
    </>
  );
}
