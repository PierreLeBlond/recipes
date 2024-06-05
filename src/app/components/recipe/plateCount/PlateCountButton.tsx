import { Button } from "@/src/lib/material";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { ControllerRenderProps } from "react-hook-form";
import { QueryParamsLink } from "../../utils/QueryParamsLink";

type PlateCountButtonProps = {
  plateCount: number;
  edit: boolean;
  value: number;
  field: ControllerRenderProps<FormInputs, "plateCount">;
};

export function PlateCountButton({
  props: { value, field, plateCount, edit },
  children,
}: {
  props: PlateCountButtonProps;
  children: React.ReactNode;
}) {
  const button = edit ? (
    <Button
      type="button"
      id={`plate-count-button-${value}`}
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
    <Button
      id={`plate-count-button-${value}`}
      color="brown"
      className="h-full w-16 p-0"
    >
      <QueryParamsLink
        className="flex h-full w-full items-center justify-center p-2"
        props={{
          partialQueryState: {
            plateCount: plateCount + value,
          },
        }}
      >
        {children}
      </QueryParamsLink>
    </Button>
  );

  return (
    <>
      <label className="hidden" htmlFor={`plate-count-button-${value}`}>
        {`Changer le nombre d'assiettes de ${value}`}
      </label>
      {button}
    </>
  );
}
