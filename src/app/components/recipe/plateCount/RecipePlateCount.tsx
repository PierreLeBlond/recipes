"use client";

import { Typography } from "@/src/lib/material";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { cn } from "@/src/lib/utils";
import { useQueryState } from "@/src/lib/hooks/useQueryState";
import { PlateCountButton } from "./PlateCountButton";
import { ResetButton } from "./ResetButton";

export function RecipePlateCount() {
  const { control } = useFormContext<FormInputs>();
  const queryState = useQueryState();

  return (
    <Controller
      name="plateCount"
      control={control}
      rules={{ required: true, min: 1, max: 100 }}
      render={({ field }) => {
        const plateCount = queryState.edit
          ? field.value
          : queryState.plateCount;

        const shouldDisplayResetButton = plateCount !== field.value;

        return (
          <div className="flex items-center gap-2 font-bold">
            <div className="flex flex-col gap-2">
              <div className="flex -translate-x-1 items-center gap-2">
                <Typography>Pour</Typography>
                <PlateCountButton
                  props={{ value: 1, field, plateCount, edit: queryState.edit }}
                >
                  <Plus strokeWidth={6} size={16} />
                </PlateCountButton>
              </div>
              <div className="flex translate-x-14 items-end gap-2">
                <Typography
                  className={cn("font-bold transition-colors duration-300", {
                    "text-blue-gray-500": queryState.edit,
                  })}
                >
                  {plateCount}
                </Typography>
              </div>
              <div className="flex translate-x-7 items-center gap-2">
                <PlateCountButton
                  props={{
                    value: -1,
                    field,
                    plateCount,
                    edit: queryState.edit,
                  }}
                >
                  <Minus strokeWidth={6} size={16} />
                </PlateCountButton>
                <Typography>personne{plateCount > 1 ? "s" : ""}</Typography>
                {shouldDisplayResetButton && (
                  <ResetButton props={{ plateCount: field.value }}>
                    <RotateCcw strokeWidth={3} size={16} />
                  </ResetButton>
                )}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
