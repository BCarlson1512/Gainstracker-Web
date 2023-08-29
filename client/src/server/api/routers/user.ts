import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from 'zod'
import { prisma } from "~/server/db";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure
    .query(async({ctx}) => {
        const users = await prisma.user.findMany({
            take: 100,
        });
        return users;
    }),
    getID: publicProcedure
    .input(z.string())
    .query(async({ctx, input}) => {
        const user = await prisma.user.findFirst({
            where: {
                id: input,
            },
        });
        return user;
    }),
    createUser: publicProcedure
    .input(z.object({ //TODO: Update with additional user data
        name: z.string(),
        profileUrl: z.string(),
        email: z.string(),

    }))
    .mutation(async({ctx, input}) => {
        const user = await prisma.user.create({
            data: {
                name: input.name,
                image: input.profileUrl,
            }
        });
        return user;
    }),
    updateUser: publicProcedure
    .input(
        z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            image: z.string(),
        })
    )
    .mutation(async({ctx, input}) => {
        const user = await prisma.user.update({
            where: {
                id: input.id,
            },
            data: {
                name: input.name,
                email: input.email,
                image: input.image
            }
        })
        return user;
    }),
    deleteUser: publicProcedure
    .input(z.object({id: z.string()}))
    .mutation(async({ctx, input}) => {
        const deletedUser = await prisma.user.delete({
            where: {
                id: input.id
            }
        })
        return deletedUser;
    })
})

export type UserRouter = typeof userRouter;