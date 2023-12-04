import { z } from "zod";
import { prisma } from "~/server/db";
import { setSchema } from "../schemas/set";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const setRouter = createTRPCRouter({
    getByAuthedUID: protectedProcedure
    .query(async({ctx}) => {
        try {
            const {auth} = ctx
            const userSets = await prisma.set.findMany({
                where: {
                    userId: auth.userId
                },
                take: 100
            })
            return userSets;
        }catch(err) {
            return {err: err, msg: ""}
        }
    }),
    getMonthlyVolume: protectedProcedure
    .query(async({ctx}) => {
        const {auth} = ctx;
        const lastMonthStart = new Date();
        lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
        try {
            const setCounts = await prisma.set.groupBy({
                by:['createdAt'],
                where: {
                    userId: auth.userId,
                    createdAt: {
                        gte: lastMonthStart
                    }
                },
                _count: {
                    createdAt: true
                }
            })
            return setCounts;
        } catch(err) {
            return {err: err, msg: ""}
        }
    }),
    updateSet: protectedProcedure
    .input(z.object({sid: z.string(), set: setSchema}))
    .mutation(async({input}) => {
        const {sid, set} = input;
        try {
            const dbSet = await prisma.set.update({
                where: {
                    id: sid,
                },
                data: {
                    ...set
                }
            })
            return dbSet;
        }catch (err) {
            return {err: err, msg: ""}
        }

    }),
    deleteSets: protectedProcedure
    .input(z.object({setIds: z.array(z.string())}))
    .mutation(async({input}) => {
        const {setIds} = input;
        try {
            const deletedSets = await prisma.set.deleteMany({
                where: {
                    id: {
                        in: setIds
                    }
                }
            })
            return deletedSets;
        }catch (err) {
            return {err: err, msg: ""}
        }

    })
})
export type setRouter = typeof setRouter;
