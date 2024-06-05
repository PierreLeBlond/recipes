import { Button } from "@/src/lib/material";
import { QueryParamsLink } from "../../utils/QueryParamsLink";

type PlateCountButtonProps = {
  plateCount: number;
};

export function ResetButton({
  props: { plateCount },
  children,
}: {
  props: PlateCountButtonProps;
  children: React.ReactNode;
}) {
  return (
    <>
      <label className="hidden" htmlFor="reset-button">
        Réinitialiser
      </label>
      <Button
        id="reset-button"
        color="brown"
        className="h-8 w-8 rounded-full p-0"
      >
        <QueryParamsLink
          className="flex h-full w-full items-center justify-center p-2"
          props={{
            partialQueryState: {
              plateCount,
            },
          }}
        >
          {children}
        </QueryParamsLink>
      </Button>
    </>
  );
}
