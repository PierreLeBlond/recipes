"use client";

import { Button } from "@/src/lib/material";
import { Minus, Plus } from "lucide-react";

type RecipePlateCountProps = {
  plateCount: number;
  handlePlateCountChange: (count: number) => void;
};

export function RecipePlateCount({
  props: { plateCount, handlePlateCountChange },
}: {
  props: RecipePlateCountProps;
}) {
  return (
    <div className="flex items-center justify-center gap-2 font-bold">
      <p>Pour</p>
      <div className="flex flex-col items-center gap-2">
        <Button
          className="flex w-16 translate-x-6 items-center justify-center p-2"
          onClick={() => handlePlateCountChange(1)}
          type="button"
          disabled={plateCount >= 100}
          variant="gradient"
        >
          <Plus strokeWidth={6} size={16}></Plus>
        </Button>
        <p className="w-full rounded-md border border-gray-700 p-1 text-center font-bold">
          {plateCount}
        </p>
        <Button
          className="flex w-16 -translate-x-6 items-center justify-center p-2"
          onClick={() => handlePlateCountChange(-1)}
          disabled={plateCount === 1}
          variant="gradient"
        >
          <Minus strokeWidth={6} size={16}></Minus>
        </Button>
      </div>
      <p>personne{plateCount > 1 ? "s" : ""}</p>
    </div>
  );
}
