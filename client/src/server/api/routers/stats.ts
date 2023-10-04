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
            const weeklySets = await prisma.workoutLog.findMany({
                where: {
                    authorId: userId,
                },
                select: {
                    _count: {
                        select: {
                            sets: true
                        }
                    }
                }
            })
            const initialCount = 0
            const setCount = weeklySets.reduce((prev, curr) => prev + curr._count.sets, initialCount)
            return setCount
        } catch(err) {
            
        }
    }),
    getWeeklySetsCompleted: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth
        try {
            const currDate = new Date(Date.now());
            const weekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            const weeklySets = await prisma.workoutLog.findMany({
                where: {
                    AND: [
                        {authorId: userId},
                        {dateCreated: {
                            gte: weekDate.toISOString(),
                            lte: currDate.toISOString(),
                        }}
                    ]
                },
                select: {
                    _count: {
                        select: {
                            sets: true
                        }
                    }
                }
            })
            const initialCount = 0
            const setCount = weeklySets.reduce((prev, curr) => prev + curr._count.sets, initialCount)
            return setCount
        } catch(err) {
            
        }
    }),
    getWeeklyWeightLifted: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth
        try {
            const currDate = new Date(Date.now());
            const weekDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            const weeklySets = await prisma.workoutLog.findMany({ //TODO: Adjust for scale later (maybe cache?)
                where: {
                    AND: [
                        {authorId: userId},
                        {dateCreated: {
                            lte: currDate,
                            gte: weekDate
                        }}
                    ]
                },
                select: {
                    sets: {
                        select: {
                            weight: true,
                            reps: true
                        }
                    }
                }
            })
            // eslint-disable-next-line
            const aggregatedSets:any[] = []
            weeklySets.forEach(setGroup => aggregatedSets.push(...setGroup.sets))
            const initialVolume = 0
            // eslint-disable-next-line
            const weeklyVolume:number = aggregatedSets.reduce((prev, curr) => prev + (curr.weight * curr.reps), initialVolume)
            return weeklyVolume;
        } catch(err) {
            
        }
        return 0
    }),
    getTotalWeightLifted: protectedProcedure
    .query(async({ctx}) => {
        const {userId} = ctx.auth
        try {
            const totalSets = await prisma.set.findMany({ //TODO: adjust for scale later (may nuke db)
                where: {
                    userId: userId
                },
                select: {
                    weight: true,
                    reps: true
                }
            })
            const initialVolume = 0
            const totalVolume = totalSets.reduce((prev, curr) => prev + (curr.weight * curr.reps), initialVolume)
            return totalVolume
        } catch(err) {
            
        }
    })
})
export type statsRouter = typeof statsRouter;
