import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation.js";
import { useWatch } from "react-hook-form";
import { FormInputs } from "../types/FormInputs";
import { QueryState } from "../queryState/QueryState";
import { Unit } from "../types/Units";

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
        [ingredient.food.name]: searchParams.get(
          `${ingredient.food.name}Unit`,
        ) as Unit | undefined,
      }),
      {},
    ),
  };
};
