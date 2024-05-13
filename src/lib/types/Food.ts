import { Units } from "@/prisma/generated/client/index.js";

export type Food = {
  name: string;
  density: number | null;
  massPerPiece: number | null;
  unit: Units;
  image: string | null;
};
