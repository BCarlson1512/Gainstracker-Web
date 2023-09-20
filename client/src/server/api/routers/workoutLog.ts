import { z } from "zod";
import { prisma } from "~/server/db";
import { workoutSchema } from "../schemas/workoutLog";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workoutLogRouter = createTRPCRouter({
    getByAuthedUid: protectedProcedure
    .query(async({ctx}) => {
        const workouts = await prisma.workoutLog.findMany({
            where: {
                authorId: ctx.userId
            },
            include: {
                sets: true
            },
            take: 100
        })
        return workouts;
    }),
    getID: protectedProcedure
    .input(z.string())
    .query(async({ctx,input}) => {
        const workout = await prisma.workoutLog.findFirst({
            where: {
                id: input,
            },
            include: {
                sets: true
            }
        })
        return workout;
    }),
    createWorkoutLog: protectedProcedure
    .input(workoutSchema)
    .mutation(async({ctx,input}) => {
        const {sets, notes, name, trainingPlanId} = input
        const workout = await prisma.workoutLog.create({
            data:{
                trainingPlanId,
                notes,
                name,
                authorId: ctx.userId,
                sets: {
                    createMany:{
                        data: sets
                    }
                }
            }
        })
        return workout;
    }),
    updateWorkoutLog: protectedProcedure
    .input(workoutSchema)
    .mutation(async({ctx,input}) => {
        return {};
    }),
    deleteWorkoutLog: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async({ctx,input}) => {
        const deletedWorkout = await prisma.workoutLog.delete({
            where: {
                id: input.id,
            }
        })
        return deletedWorkout;
    }),
})
export type workoutLogRouter = typeof workoutLogRouter;
