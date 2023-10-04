import { prisma } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const statsRouter = createTRPCRouter( {
    getWeeklyWorkoutCount: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth
        try {
            const currDate = new Date(Date.now());
            const weekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            const weeklyLogs = await prisma.workoutLog.count({
                where: {
                    AND: [
                        {authorId: userId},
                        {dateCreated: {
                            gte: weekDate.toISOString(),
                            lte: currDate.toISOString(),
                        }}
                    ]

                },
            })
            return weeklyLogs
        } catch (err) {

        }
    }),
    getLifetimeWorkouts: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth
        try {
            const totalLogs = await prisma.workoutLog.count({
                where: {
                    authorId: userId,
                }
            })
            return totalLogs
        } catch(err) {

        }
    }),
    getTotalSetsCompleted: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth
        try {
            const totalSets = await prisma.set.count({
                where: {
                    userId: userId
                }
            })
            return totalSets
        } catch(err) {

        }
    }),
    getWeeklySetsCompleted: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth
        try {
            const currDate = new Date(Date.now());
            const weekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            const weeklySets = await prisma.set.count({
                where: {
                    userId: userId
                }
            })
            return weeklySets
        } catch(err) {
            
        }
    }),
    getWeeklyWeightLifted: protectedProcedure
    .query(({ctx}) => {
        const {userId} = ctx.auth
        try {

        } catch(err) {
            
        }
        return 0
    }),
    getTotalWeightLifted: protectedProcedure
    .query(({ctx}) => {
        //TODO: implement total lbs aggregation
        const {userId} = ctx.auth
        try {

        } catch(err) {
            
        }
        return 0
    })
})
export type statsRouter = typeof statsRouter;
