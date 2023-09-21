import { trainingPlanRouter } from "~/server/api/routers/trainingPlan";
import { createTRPCRouter } from "~/server/api/trpc";
import { setRouter } from "./routers/set";
import { userRouter } from "./routers/user";
import { workoutLogRouter } from "./routers/workoutLog";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  trainingPlan: trainingPlanRouter,
  set: setRouter,
  workoutLog: workoutLogRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
