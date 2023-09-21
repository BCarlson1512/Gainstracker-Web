import { z } from "zod";
import { prisma } from "~/server/db";
import { workoutSchema } from "../schemas/workoutLog";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workoutLogRouter = createTRPCRouter({
    getByAuthedUID: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth;
        try {
            const workouts = await prisma.workoutLog.findMany({
                where: {
                    authorId: userId
                },
                include: {
                    sets: true
                },
                take: 100
            })
            return {workouts, ctx: ctx};
        } catch (err) {
            return {err: err}
        }
    }),
    getID: protectedProcedure
    .input(z.string())
    .query(async({ctx,input}) => {
        try {
            const workout = await prisma.workoutLog.findFirst({
                where: {
                    id: input,
                },
                include: {
                    sets: true
                }
            })
            return workout;
        } catch (err) {
            return {err: err}
        }
    }),
    createLog: protectedProcedure
    .input(workoutSchema)
    .mutation(async({ctx, input}) => {
        const {notes, workoutName, trainingPlanId, sets} = input;
        const {userId} = ctx.auth
        const userIdSets = sets.map(set => {return {...set, userId}})
        try {
            // context exists until here... where it's getting destroyed
            const dbLog = await prisma.workoutLog.create({
                data: {
                    trainingPlanId,
                    notes,
                    name: workoutName,
                    authorId: userId,
                    sets: {
                        createMany: {
                            data: userIdSets
                        }
                    }
                }
            })
            return dbLog;
        } catch (err) {
            return {err: err, ctx: ctx}
        }
    }),
    updateWorkoutLog: protectedProcedure
    .input(workoutSchema)
    .mutation(async({ctx,input}) => {
        return {};
    }),
    deleteWorkoutLog: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async({ctx,input}) => {
        try {
            const deletedWorkout = await prisma.workoutLog.delete({
                where: {
                    id: input.id,
                }
            })
            return deletedWorkout;
        } catch (err) {
            return {err: err}
        }
    }),
})
export type workoutLogRouter = typeof workoutLogRouter;
