import { Units } from "@/prisma/generated/client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useWatch } from "react-hook-form";
import { FormInputs } from "../types/FormInputs";
import { QueryState } from "../queryState/QueryState";

// Expect a react-hook-form & a session context
export const useQueryState = (): QueryState => {
  const [plateCount, ingredients] = useWatch<
    FormInputs,
    ["plateCount", "ingredients"]
  >({
    name: ["plateCount", "ingredients"] as const,
  });
  const searchParams = useSearchParams();
  const session = useSession();

  const edit =
    searchParams.get("edit") === "true" && session.data?.user.role === "ADMIN";
  const plateCountSearchParams = searchParams.get("plateCount");

  return {
    edit,
    plateCount: plateCountSearchParams
      ? parseInt(plateCountSearchParams, 10)
      : plateCount,
    units: ingredients.reduce(
      (accu, ingredient) => ({
        ...accu,
        [ingredient.foodName]: searchParams.get(
          `${ingredient.foodName}Unit`,
        ) as Units | undefined,
      }),
      {},
    ),
  };
};
