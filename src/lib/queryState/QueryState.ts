import { Units } from "@/prisma/generated/client";

export type QueryState = {
  edit: boolean;
  plateCount: number;
  units: Record<string, Units>;
};
