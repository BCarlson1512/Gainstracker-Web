import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { prisma } from "~/server/db";
import { populateExercise } from "~/utils/exercises/exercises";

const exerciseSchema = z
.array(
    z.object({
        name: z.string(),
        muscleGrouping: z.string(),
    }
))

const trainingPlanSchema = z.object({
    id: z.optional(z.string()),
    name: z.string(),
    exercises: exerciseSchema,
    authorId: z.string()
})

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
    createTrainingPlan: publicProcedure
    .input(trainingPlanSchema)
    .mutation(async({ctx, input}) => {
        const {name, authorId, exercises} = input
        const createdTrainingPlan = await prisma.trainingPlan.create({
            data: {
                name: name,
                authorId: authorId,
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
    updateTrainingPlan: publicProcedure
    .input(trainingPlanSchema)
    .mutation(async({ctx, input}) => {
        const {id, exercises, name} = input;
        const trainingPlan = await prisma.trainingPlan.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                exercises: {
                    createMany: {
                        data: exercises, 
                    }
                }
            },
            include: {exercises: true}
        })
        return trainingPlan;
    }),
})
export type trainingPlanRouter = typeof trainingPlanRouter;