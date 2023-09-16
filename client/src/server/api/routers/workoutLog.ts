import { z } from "zod";
import { prisma } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workoutRouter = createTRPCRouter({
    getByAuthedUid: protectedProcedure
    .query(async({ctx}) => {
        return {};
    }),
    getID: protectedProcedure
    .input(z.string())
    .query(async({ctx,input}) => {
        return {};
    }),
    createWorkoutLog: protectedProcedure
    .input(z.object({}))
    .mutation(async({ctx,input}) => {
        return {};
    }),
    updateWorkoutLog: protectedProcedure
    .input(z.object({}))
    .mutation(async({ctx,input}) => {
        return {};
    }),
    deleteWorkoutLog: protectedProcedure
    .input(z.object({}))
    .mutation(async({ctx,input}) => {
        return {};
    }),
})
export type workoutRouter = typeof workoutRouter;
