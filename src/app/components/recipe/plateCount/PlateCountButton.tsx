import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { Button } from "@/src/lib/material";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { ControllerRenderProps } from "react-hook-form";
import { QueryParamsLink } from "../../utils/QueryParamsLink";

type PlateCountButtonProps = {
  plateCount: number;
  value: number;
  field: ControllerRenderProps<FormInputs, "plateCount">;
};

export function PlateCountButton({
  props: { value, field, plateCount },
  children,
}: {
  props: PlateCountButtonProps;
  children: React.ReactNode;
}) {
  const queryState = useQueryState();

  return queryState.edit ? (
    <Button
      type="button"
      className="flex h-full w-16 items-center justify-center p-2"
      color="blue-gray"
      variant="filled"
      disabled={plateCount <= 0 || plateCount >= 100}
      onClick={() => {
        field.onChange(field.value + value);
      }}
    >
      {children}
    </Button>
  ) : (
    <Button color="brown" className="h-full w-16 p-0">
      <QueryParamsLink
        className="flex h-full w-full items-center justify-center p-2"
        props={{
          partialQueryState: {
            plateCount: queryState.plateCount + value,
          },
        }}
      >
        {children}
      </QueryParamsLink>
    </Button>
  );
}
