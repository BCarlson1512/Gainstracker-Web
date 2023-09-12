import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { prisma } from "~/server/db";
import { trainingPlanSchema } from "../schemas/trainingPlan";

export const trainingPlanRouter = createTRPCRouter({
    getAll: publicProcedure
    .query(async({ctx}) => {
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
        const trainingPlan = await prisma.trainingPlan.findMany({
            where: {
                authorId: ctx.userId,
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
    .query(async({ctx, input}) => {
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
    .query(async({ctx, input}) => {
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
        const createdTrainingPlan = await prisma.trainingPlan.create({
            data: {
                name: name,
                authorId: ctx.userId,
                author: ctx.userId,
                exercises:{ 
                    createMany:{
                        data: exercises
                    }
                }
            }
        });
        return createdTrainingPlan;
    }),
    deleteTrainingPlan: publicProcedure
    .input(z.object({
        id: z.string()
    }))
    .mutation(async({ctx, input}) => {
        const deletedTrainingPlan = await prisma.trainingPlan.delete({
            where: {
                id: input.id
            }
        });
        return deletedTrainingPlan;
    }),
    deleteTrainingPlanExercises: protectedProcedure
    .input(z.object({
            removedExerciseIds: z.array(z.string())
        }))
    .mutation (async({ctx, input}) => {
        const {removedExerciseIds} = input
        const dbExercisesRemoved = await prisma.exercise.deleteMany({
            where: {
                id: {
                    in: removedExerciseIds
                }
            }
        })
        return dbExercisesRemoved;
    }),
    updateTrainingPlan: protectedProcedure
    .input(trainingPlanSchema)
    .mutation(async({ctx, input}) => {
        const {id, exercises, name} = input;
        const trainingPlan = await prisma.trainingPlan.update({
            where: {
                id: id,
            },
            data: {
                name: name,
            },
        })
        const dbExercises = []
        exercises.map(async (exercise) => {
            const dbExercise = await prisma.exercise.upsert({
                where: {
                    trainingId: id,
                    id: exercise.id,
                    name: exercise.name
                },
                update: {
                    name: exercise.name,
                    muscleGrouping: exercise.muscleGrouping,
                    numOfSets: exercise.numOfSets
                },
                create: {
                    name: exercise.name,
                    muscleGrouping: exercise.muscleGrouping,
                    numOfSets: exercise.numOfSets,
                    trainingId: id
                }
            })
            dbExercises.push(dbExercise);
        })
        return trainingPlan;
    }),
})
export type trainingPlanRouter = typeof trainingPlanRouter;