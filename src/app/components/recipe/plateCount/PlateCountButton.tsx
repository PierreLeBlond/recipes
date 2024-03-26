import { Recipe } from "@/prisma/generated/client";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { Button } from "@/src/lib/material";
import { QueryState } from "@/src/lib/queryState/QueryState";
import { serializeQueryState } from "@/src/lib/queryState/serializeQueryState";
import { FormInputs } from "@/src/lib/types/FormInputs";
import Link from "next/link";
import { ControllerRenderProps } from "react-hook-form";
import { QueryParamsLink } from "../../utils/QueryParamsLink";

type PlateCountButtonProps = {
  plateCount: number;
  value: number;
  field: ControllerRenderProps<FormInputs, "plateCount">;
};

export const PlateCountButton = ({
  props: { value, field, plateCount },
  children,
}: {
  props: PlateCountButtonProps;
  children: React.ReactNode;
}) => {
  const queryState = useQueryState();

  return (
    <Button
      className="w-16 p-0 transition-colors duration-300"
      disabled={plateCount <= 0 || plateCount >= 100}
      color={queryState.edit ? "blue-gray" : "gray"}
      variant="filled"
    >
      {queryState.edit ? (
        <div
          className="flex h-full w-full items-center justify-center p-2"
          onClick={() => {
            field.onChange(field.value + value);
          }}
        >
          {children}
        </div>
      ) : (
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
      )}
    </Button>
  );
};
