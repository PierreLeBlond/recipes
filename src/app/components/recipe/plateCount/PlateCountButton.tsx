import { FormInputs } from "@/src/lib/types/FormInputs";
import { ControllerRenderProps } from "react-hook-form";
import { QueryParamsLink } from "../../utils/QueryParamsLink";
import { Button } from "../../ui/button";

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
  const content = edit ? (
    children
  ) : (
    <QueryParamsLink
      className="flex h-full w-full items-center justify-center"
      props={{
        partialQueryState: {
          plateCount: plateCount + value,
        },
      }}
    >
      {children}
    </QueryParamsLink>
  );

  const handleClick = () => {
    if (!edit) {
      return;
    }
    field.onChange(field.value + value);
  };
  const button = (
    <Button
      type="button"
      id={`plate-count-button-${value}`}
      className="flex h-full w-16 items-center justify-center p-2"
      variant={edit ? "edit" : "link"}
      disabled={plateCount <= 0 || plateCount >= 100}
      onClick={handleClick}
    >
      {content}
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
