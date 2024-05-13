import { Units } from "@/prisma/generated/client/index.js";

export type QueryState = {
  edit: boolean;
  plateCount: number;
  units: Record<string, Units>;
};
