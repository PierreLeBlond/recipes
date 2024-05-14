import { Unit } from "../types/Units";

export type QueryState = {
  edit: boolean;
  plateCount: number;
  units: Record<string, Unit>;
};
