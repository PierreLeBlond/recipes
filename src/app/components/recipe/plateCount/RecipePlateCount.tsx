"use client";

import { Typography } from "@/src/lib/material";
import { Minus, Plus } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputs } from "@/src/lib/types/FormInputs";
import { PlateCountButton } from "./PlateCountButton";
import { cn } from "@/src/lib/utils";
import { useQueryState } from "@/src/lib/hooks/useQueryState";

export function RecipePlateCount() {
  const { control } = useFormContext<FormInputs>();
  const { edit, plateCount: plateCountQueryState } = useQueryState();

  return (
    <Controller
      name="plateCount"
      control={control}
      rules={{ required: true, min: 1, max: 100 }}
      render={({ field }) => {
        const plateCount = edit ? field.value : plateCountQueryState;

        return (
          <div className="flex items-center gap-2 font-bold">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex -translate-x-1 items-end gap-2">
                <Typography>Pour</Typography>
                <PlateCountButton props={{ value: 1, field, plateCount }}>
                  <Plus strokeWidth={6} size={16}></Plus>
                </PlateCountButton>
              </div>
              <Typography
                className={cn("font-bold transition-colors duration-300", {
                  "text-blue-gray-500": edit,
                })}
              >
                {plateCount}
              </Typography>
              <div className="flex translate-x-7 items-start gap-2">
                <PlateCountButton props={{ value: -1, field, plateCount }}>
                  <Minus strokeWidth={6} size={16}></Minus>
                </PlateCountButton>
                <Typography>personne{plateCount > 1 ? "s" : ""}</Typography>
              </div>
            </div>
          </div>
        );
      }}
    ></Controller>
  );
}
