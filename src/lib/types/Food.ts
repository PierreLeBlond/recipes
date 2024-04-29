import { Units } from "@/prisma/generated/client";

export type Food = {
  name: string;
  density: number | null;
  massPerPiece: number | null;
  unit: Units;
};
