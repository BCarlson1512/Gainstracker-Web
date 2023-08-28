import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { prisma } from "~/server/db";

const trainingPlanRouter = createTRPCRouter({
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
        exercises: z.custom(),
        author: z.string()
        //TODO: Validate exercise types
    }))
    .mutation(async({ctx, input}) => {
        const createdTrainingPlan = await prisma.trainingPlan.create({
            data: {
                name: input.name,
                exercises: input.exercises,
                authorId: input.author
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
    updateTrainingPlan: publicProcedure
    .input(
        z.object({
            id: z.string(),
            name: z.string(),
            exercises: z.custom()
        })
    )
    .mutation(async({ctx, input}) => {
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