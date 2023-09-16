import { z } from "zod";
import { prisma } from "~/server/db";
import { setSchema } from "../schemas/set";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const setRouter = createTRPCRouter({
    getByAuthedUID: protectedProcedure
    .query(async({ctx}) => {
        const userSets = await prisma.set.findMany({
            where: {
                userId: ctx.userId
            },
            take: 100
        })
        return userSets;
    }),
    createSets: protectedProcedure
    .input(z.object({sets: z.array(setSchema)}))
    .mutation(async({ctx, input}) => {
        const {sets} = input;
        const createdSets = await prisma.set.createMany({
            data: {
                ...sets
            }
        })
        return createdSets;
    }),
    updateSet: protectedProcedure
    .input(z.object({sid: z.string(), set: setSchema}))
    .mutation(async({ctx, input}) => {
        const {sid, set} = input;
        const dbSet = await prisma.set.update({
            where: {
                id: sid,
            },
            data: {
                ...set
            }
        })
        return dbSet;
    }),
    deleteSets: protectedProcedure
    .input(z.object({setIds: z.array(z.string())}))
    .mutation(async({ctx, input}) => {
        const {setIds} = input;
        const deletedSets = await prisma.set.deleteMany({
            where: {
                id: {
                    in: setIds
                }
            }
        })
        return deletedSets;
    })
})
export type setRouter = typeof setRouter;
