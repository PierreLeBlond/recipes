import { recipeRouter } from "@/src/server/api/routers/recipe";
import { createTRPCRouter } from "@/src/server/api/trpc";
import { foodRouter } from "./routers/food";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recipe: recipeRouter,
  food: foodRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
