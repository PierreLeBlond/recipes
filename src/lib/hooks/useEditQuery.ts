import { Session } from "next-auth";
import { useSearchParams } from "next/navigation.js";

export const useEditQuery = (session: Session | null): boolean => {
  const searchParams = useSearchParams();

  const edit =
    searchParams.get("edit") === "true" && session?.user.role === "ADMIN";

  return edit;
};
