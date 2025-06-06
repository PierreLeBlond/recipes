import { uploadImage } from "@/src/lib/s3/uploadImage";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/src/server/api/trpc";
import { z } from "zod";
import { randomUUID } from "crypto";

export const recipeRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // https://trpc.io/docs/client/react/useInfiniteQuery
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const recipes = await ctx.db.recipe.findMany({
        // We take one more item, to determine if there is a next page
        take: limit + 1,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        where: { name: { contains: input.search, mode: "insensitive" } },
        orderBy: { createdAt: "desc" },
      });

      if (recipes.length < limit + 1) {
        // There is no next page
        return { recipes, nextCursor: null };
      }

      // Remove the extra item
      recipes.pop();

      return {
        recipes,
        nextCursor: recipes.at(recipes.length - 1)?.id ?? null,
      };
    }),
  read: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) =>
      ctx.db.recipe.findUniqueOrThrow({
        where: { id: input.id },
        include: {
          ingredients: { include: { food: true }, orderBy: { index: "asc" } },
          steps: true,
        },
      }),
    ),
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(3).max(33),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.db.recipe.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      }),
    ),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(3).max(33),
        image: z.string().nullable(),
        plateCount: z.number().min(1).max(100).default(8),
        ingredients: z.array(
          z.object({
            foodName: z.string(),
            quantity: z.number(),
          }),
        ),
        steps: z.array(z.object({ description: z.string() })),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const recipe = await ctx.db.recipe.findUniqueOrThrow({
        where: { id: input.id },
        include: { ingredients: { include: { food: true } }, steps: true },
      });

      let { image } = recipe;
      let uuid = recipe.imageName;
      if (input.image && input.image !== image) {
        uuid = recipe.imageName || randomUUID();
        image = `${process.env.S3_PUBLIC_ENDPOINT}/images/${uuid}`;
        await uploadImage(uuid, input.image);
      }

      return ctx.db.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          image,
          imageName: uuid,
          plateCount: input.plateCount,
          ingredients: {
            deleteMany: {
              recipeId: recipe.id,
            },
            create: input.ingredients.map((ingredient, index) => ({
              quantity: ingredient.quantity,
              index,
              food: { connect: { name: ingredient.foodName } },
            })),
          },
          steps: {
            deleteMany: {
              recipeId: recipe.id,
            },
            create: input.steps.map((step, index) => ({
              description: step.description,
              index,
            })),
          },
        },
        include: {
          ingredients: { include: { food: true }, orderBy: { index: "asc" } },
          steps: true,
        },
      });
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.db.recipe.delete({ where: { id: input.id } }),
    ),
});
