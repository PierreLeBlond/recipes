import { Button } from "../../ui/button";
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
        variant="link"
        className="h-8 w-8 rounded-full p-0"
      >
        <QueryParamsLink
          className="flex h-full w-full items-center justify-center p-2"
          props={{
            name: "plateCount",
            value: plateCount.toString(),
          }}
        >
          {children}
        </QueryParamsLink>
      </Button>
    </>
  );
}
