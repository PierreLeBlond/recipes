import { useSearchParams } from "next/navigation.js";
import { useWatch } from "react-hook-form";
import { FormInputs } from "../types/FormInputs";

export const usePlateCountQuery = (): number => {
  const [plateCount] = useWatch<FormInputs, ["plateCount"]>({
    name: ["plateCount"] as const,
  });
  const searchParams = useSearchParams();
  const plateCountSearchParams = searchParams.get("plateCount");

  return plateCountSearchParams
    ? parseInt(plateCountSearchParams, 10)
    : plateCount;
};
