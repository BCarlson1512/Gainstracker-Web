import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { prisma } from "~/server/db";
import { populateExercise } from "~/utils/exercises/exercises";

export const trainingPlanRouter = createTRPCRouter({
    getAll: publicProcedure
    .query(async({ctx}) => {
        const trainingPlans = await prisma.trainingPlan.findMany({
            take: 100,
        });
        return trainingPlans;
    }),
    getByUserID: publicProcedure
    .input(z.string())
    .query(async({ctx, input}) => {
        const trainingPlan = await prisma.trainingPlan.findMany({
            where: {
                authorId: input,
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
            }
        })
        return trainingPlan;
    }),
    createTrainingPlan: publicProcedure
    .input(z.object({
        name: z.string(),
        exercises: z.any(),
        author: z.string()
    }))
    .mutation(async({ctx, input}) => {
        const createdTrainingPlan = await prisma.trainingPlan.create({
            data: {
                name: input.name,
                authorId: input.author
            }
        });
        if (createdTrainingPlan.id && input.exercises) {
            populateExercise(input.exercises, createdTrainingPlan.id)
            return await prisma.trainingPlan.update({
                where: {id: createdTrainingPlan.id},
                data: {
                    exercises: createdTrainingPlan.exercises
                }
            })
        }
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
    updateTrainingPlan: publicProcedure
    .input(
        z.object({
            id: z.string(),
            name: z.string(),
            exercises: z.custom()
        })
    )
    .mutation(async({ctx, input}) => {
        populateExercise(input.exercises, id)
        const trainingPlan = await prisma.trainingPlan.update({
            where: {
                id: input.id,
            },
            data: {
                
            }
        })
        return trainingPlan;
    }),
})
export type trainingPlanRouter = typeof trainingPlanRouter;