import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { prisma } from "~/server/db";
import { trainingPlanSchema } from "../schemas/trainingPlan";
import { upsertExercises } from "~/utils/exercises/exercises";

export const trainingPlanRouter = createTRPCRouter({
    getAll: protectedProcedure
    .query(async() => {
        const trainingPlans = await prisma.trainingPlan.findMany({
            include: {
                exercises: true
            },
            take: 100,
        });
        return trainingPlans;
    }),
    getByAuthedUID: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth
        const trainingPlan = await prisma.trainingPlan.findMany({
            where: {
                authorId: userId,
            },
            include: {
                exercises: true
            },
            take: 100,
        });
        return trainingPlan;
    }),
    getByUserID: publicProcedure
    .input(z.string())
    .query(async({input}) => {
        const trainingPlan = await prisma.trainingPlan.findMany({
            where: {
                authorId: input,
            },
            include: {
                exercises: true
            },
            take: 100,
        });
        return trainingPlan;
    }),
    getID: publicProcedure
    .input(z.string())
    .query(async({input}) => {
        const trainingPlan = await prisma.trainingPlan.findFirst({
            where: {
                id: input
            },
            include: {
                exercises: true
            },
        })
        return trainingPlan;
    }),
    createTrainingPlan: protectedProcedure
    .input(trainingPlanSchema)
    .mutation(async({ctx, input}) => {
        const {name, exercises} = input
        const {userId} = ctx.auth
        try {
            const createdTrainingPlan = await prisma.trainingPlan.create({
                data: {
                    name: name,
                    authorId: userId,
                    exercises:{ 
                        createMany:{
                            data: exercises
                        }
                    }
                }
            });
            return createdTrainingPlan;
        } catch (err) {
            return {err: err, msg:"Could not create training plan"}
        }
    }),
    deleteTrainingPlan: publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .mutation(async({input}) => {
        try {
            const deletedTrainingPlan = await prisma.trainingPlan.delete({
                where: {
                    id: input.id
                }
            });
            return deletedTrainingPlan;
        } catch (err) {
            return {err: err, msg:"Could not delete training plan"}
        }
    }),
    deleteTrainingPlanExercises: protectedProcedure
    .input(z.object({
            removedExerciseIds: z.array(z.string())
        }))
    .mutation (async({input}) => {
        const {removedExerciseIds} = input
        try {
            const dbExercisesRemoved = await prisma.exercise.deleteMany({
                where: {
                    id: {
                        in: removedExerciseIds
                    }
                }
            })
            return dbExercisesRemoved;
        } catch (err) {
            return {err: err, msg:"Could not remove exercises"}
        }
    }),
    updateTrainingPlan: protectedProcedure
    .input(trainingPlanSchema)
    .mutation(async({input}) => {
        const {id, exercises, name} = input;
        try {
            const trainingPlan = await prisma.trainingPlan.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                },
            })
            upsertExercises(exercises, id)
            return trainingPlan;
        } catch (err) {
            return {err: err, msg:"Could not update training plan"}
        }
    }),
})
export type trainingPlanRouter = typeof trainingPlanRouter;
