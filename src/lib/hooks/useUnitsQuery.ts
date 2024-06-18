import { useSearchParams } from "next/navigation.js";
import { Unit } from "../types/Units";

// Expect a react-hook-form & a session context
export const useUnitsQuery = (): Record<string, Unit> => {
  const searchParams = useSearchParams();

  return Array.from(searchParams.entries())
    .filter(([key]) => key.endsWith("Unit"))
    .reduce(
      (accu, [key, value]) => ({
        ...accu,
        [key.replace("Unit", "")]: value as Unit,
      }),
      {},
    );
};
