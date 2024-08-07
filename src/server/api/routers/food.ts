import { Units } from "@/src/lib/types/Units";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/src/server/api/trpc";
import { z } from "zod";

export const foodRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const foods = await ctx.db.food.findMany({
        take: limit + 1,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        where: { name: { contains: input.search, mode: "insensitive" } },
        orderBy: { name: "asc" },
      });

      if (foods.length < limit + 1) {
        return { foods, nextCursor: null };
      }

      foods.pop();

      return {
        foods,
        nextCursor: foods.at(foods.length - 1)?.id ?? null,
      };
    }),
  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        density: z.number().nullable(),
        massPerPiece: z.number().nullable(),
        unit: z.union([
          z.literal(Units.GRAM),
          z.literal(Units.LITER),
          z.literal(Units.DROP),
          z.literal(Units.PINCH),
          z.literal(Units.TEASPOON),
          z.literal(Units.TABLESPOON),
          z.literal(Units.PIECE),
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => ctx.db.food.create({ data: input })),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        density: z.number().nullable(),
        massPerPiece: z.number().nullable(),
        unit: z.union([
          z.literal(Units.GRAM),
          z.literal(Units.LITER),
          z.literal(Units.DROP),
          z.literal(Units.PINCH),
          z.literal(Units.TEASPOON),
          z.literal(Units.TABLESPOON),
          z.literal(Units.PIECE),
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.db.food.update({
        where: {
          id: input.id,
        },
        data: input,
      }),
    ),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.db.food.delete({ where: { id: input.id } }),
    ),
});
