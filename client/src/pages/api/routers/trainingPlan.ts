import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

const trainingPlanRouter = createTRPCRouter({
    getAll: publicProcedure
    .query(async({ctx}) => {
        const trainingPlans = await prisma.trainingPlan.findMany({take: 100,});
        return trainingPlans;
    }),
    getByUserID: publicProcedure
    .input(z.object({
        userId: z.string()
    }))
    .query(async({ctx, input}) => {
        const trainingPlan = await prisma.trainingPlan.findMany({
            where: {
                id: input,
            },
            take: 100,
        });
        return trainingPlan;
    }),
    getID: publicProcedure
    .input(z.object({
        trainingPlanId: z.string()
    }))
    .query(async({ctx, input}) => {
        const trainingPlan = await prisma.trainingPlan.findFirst({
            where: {
                id: input.trainingPlanId
            }
        })
        return trainingPlan;
    }),
    deletetrainingPlan: publicProcedure
    .input(z.object({id: z.string()}))
    .mutation(async({ctx, input}) => {
        const deletedTrainingPlan = await prisma.trainingPlan.delete({
            where: {
                id: input.id
            }
        })
        return deletedTrainingPlan;
    })
})
export type trainingPlanRouter = typeof trainingPlanRouter;