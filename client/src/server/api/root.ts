import { exampleRouter } from "~/server/api/routers/example";
import { trainingPlanRouter } from "~/server/api/routers/trainingPlan";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  trainingPlan: trainingPlanRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
