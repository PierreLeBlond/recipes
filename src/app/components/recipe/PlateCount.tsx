"use client";

import { Button } from "@/src/app/components/material";
import { count } from "@material-tailwind/react/types/components/rating";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type PlateCountProps = {
  plateCount: number;
  setPlateCount: (count: (count: number) => number) => void;
};

export function PlateCount({
  props: { plateCount, setPlateCount },
}: {
  props: PlateCountProps;
}) {
  return (
    <div className="flex items-center gap-2">
      <p>Pour</p>
      <div className="flex flex-col items-center gap-2">
        <Button
          className="flex w-16 items-center justify-center bg-inherit p-2 shadow-pop hover:shadow-pop focus:shadow-pop active:shadow-pop"
          onClick={() => setPlateCount((count) => count + 1)}
          color="white"
        >
          <Plus className="text-gray-700" size={16}></Plus>
        </Button>
        <p className="w-full rounded-md p-2 text-center font-bold shadow-pressed">
          {plateCount}
        </p>
        <Button
          className="flex w-16 items-center justify-center bg-inherit p-2 shadow-pop hover:shadow-pop focus:shadow-pop active:shadow-pop"
          onClick={() => setPlateCount((count) => count - 1)}
          color="white"
          disabled={plateCount === 1}
        >
          <Minus className="text-gray-700" size={16}></Minus>
        </Button>
      </div>
      <p>personne{plateCount > 1 ? "s" : ""}</p>
    </div>
  );
}
