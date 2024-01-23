import { createTRPCRouter, publicProcedure } from "@/src/server/api/trpc";
import { z } from "zod";

export const recipeRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.recipe.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  read: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.recipe.findUniqueOrThrow({
        where: { id: input.id },
        include: { ingredients: { include: { food: true } }, steps: true },
      });
    }),
});
