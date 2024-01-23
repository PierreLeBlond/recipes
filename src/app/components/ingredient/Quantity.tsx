"use client";

import { Units } from "@/prisma/generated/client";
import { getFormatedQuantity } from "./getFormatedQuantity";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList
} from "@/src/app/components/material";
import { ChevronDown } from "lucide-react";

type QuantityProps = {
  quantity: number;
  unit: Units;
  density: number | null;
  massPerPiece: number | null;
};

const alternativesMap: {
  [Unit in Units]: (data: {
    quantity: number;
    density: number | null;
    massPerPiece: number | null;
  }) => { quantity: number; unit: Units }[];
} = {
  [Units.GRAM]: ({ quantity, density }) => {
    if (density === null) {
      return [];
    }

    return [
      {
        quantity: quantity / density,
        unit: Units.LITER,
      },
    ];
  },
  [Units.LITER]: ({ quantity, density }) => {
    if (density === null) {
      return [];
    }

    return [
      {
        quantity: quantity * density,
        unit: Units.GRAM,
      },
    ];
  },
  [Units.PIECE]: ({ quantity, massPerPiece }) => {
    if (!massPerPiece) {
      return [];
    }

    return [
      {
        quantity: quantity * massPerPiece,
        unit: Units.GRAM,
      },
    ];
  },
  [Units.TEASPOON]: ({ quantity, density }) => {
    return [
      {
        quantity: quantity * 0.005,
        unit: Units.LITER,
      },
      ...(density !== null
        ? [{ quantity: quantity * 0.005 * density, unit: Units.GRAM }]
        : []),
    ];
  },
  [Units.TABLESPOON]: ({ quantity, density }) => {
    return [
      {
        quantity: quantity * 0.015,
        unit: Units.LITER,
      },
      ...(density !== null
        ? [{ quantity: quantity * 0.015 * density, unit: Units.GRAM }]
        : []),
    ];
  },
  [Units.PINCH]: ({ quantity, density }) => {
    return [
      {
        quantity: quantity * 0.0003,
        unit: Units.LITER,
      },
      ...(density !== null
        ? [{ quantity: quantity * 0.0003 * density, unit: Units.GRAM }]
        : []),
    ];
  },
  [Units.DROP]: ({ quantity, density }) => {
    return [
      {
        quantity: quantity * 0.00005,
        unit: Units.LITER,
      },
      ...(density !== null
        ? [{ quantity: quantity * 0.00005 * density, unit: Units.GRAM }]
        : []),
    ];
  },
};

export function Quantity({ props }: { props: QuantityProps }) {
  const alternatives = alternativesMap[props.unit](props);
  const hasAlternatives = alternatives.length !== 0;

  return hasAlternatives ? (
    <>
      <Menu placement="bottom-end" offset={{ mainAxis: 16, crossAxis: 8 }}>
        <MenuHandler>
          <div className="flex gap-4 cursor-pointer">
          <span className="font-bold">
            {getFormatedQuantity(props.unit, props.quantity)}
          </span>
          <ChevronDown></ChevronDown>
          </div>
        </MenuHandler>
        <MenuList className="shadow-pop rounded-md bg-gray-200 text-gray-700 p-2">
          {alternatives.map((alternative, index) => (
            <MenuItem key={index} className="flex gap-4 p-0 text-center text-base justify-end">
              <span className="font-bold">
                {getFormatedQuantity(alternative.unit, alternative.quantity)}
              </span>
              <div className="size-6"></div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  ) : (
          <div className="flex gap-4">
          <span className="font-bold">
            {getFormatedQuantity(props.unit, props.quantity)}
          </span>
          <ChevronDown className="text-gray-400"></ChevronDown>
          </div>
  );
}
