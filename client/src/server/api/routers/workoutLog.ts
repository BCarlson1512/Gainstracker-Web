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
                    sets: true,
                },
                take: 100
            })
            return {workouts, ctx: ctx};
        } catch (err) {
            return {err: err}
        }
    }),
    getAuthedTableData: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth;
        try { // TODO: PAGINATE
            // get count of sets
            if (!userId) throw new Error(`UNAUTHORIZED`)
            const workouts = await prisma.workoutLog.findMany({
                where: {
                    authorId: userId
                },
                include: {
                    _count: {
                        select: {sets: true}
                    }
                },
                take: 100
            })
            return workouts
        } catch (err) {
        }
    }),
    getID: protectedProcedure
    .input(z.object({id: z.string()}))
    .query(async({input}) => {
        try {
            const workout = await prisma.workoutLog.findFirst({
                where: {
                    id: input.id,
                },
                include:{
                    sets:true,
                }
            })
            if (!workout) {
                throw new Error(`Workout not found`)
            }
            const sets = await prisma.set.findMany({
                where: {
                    workoutId: workout.id
                },
                select: {
                    exerciseId: true
                }
            })
            const eids = sets.map(set =>{
                const newSet = {id: set.exerciseId}
                return newSet
            })
            const exercises = await prisma.exercise.findMany({
                where: {
                    OR: [
                        ...eids
                    ]
                },
                include:{
                    sets: true
                }
            })
            return {workoutData: workout, exercises: exercises};
        } catch (err) {
            return {err: err}
        }
    }),
    createLog: protectedProcedure
    .input(workoutSchema)
    .mutation(async({ctx, input}) => {
        const {notes, workoutName, trainingPlanId, sets} = input;
        const {userId} = ctx.auth
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
                            data: sets
                        }
                    }
                }
            })
            return dbLog;
        } catch (err) {
            return {err: err, ctx: sets}
        }
    }),
    /* TODO: Implement edit log on frontend
    updateLog: protectedProcedure
    .input(workoutSchema)
    .mutation(async({ctx,input}) => {
        return {};
    }),
    */
    deleteLog: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async({input}) => {
        try {
            const deleteSets = prisma.set.deleteMany({
                where: {
                    workoutId: input.id
                }
            })
            const deletedWorkout = prisma.workoutLog.delete({
                where: {
                    id: input.id,
                }
            })
            const transaction = await prisma.$transaction([deleteSets, deletedWorkout])
            return transaction;
        } catch (err) {
            return {err: err}
        }
    }),
})
export type workoutLogRouter = typeof workoutLogRouter;
