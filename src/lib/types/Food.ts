import { Unit } from "./Units";

export type Food = {
  name: string;
  density: number | null;
  massPerPiece: number | null;
  unit: Unit;
};
