import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    getUID: protectedProcedure
    .query(({ctx}) => {
        const {userId} = ctx.auth
        return {uid: userId}
    }),
})

export type userRouter = typeof userRouter;
