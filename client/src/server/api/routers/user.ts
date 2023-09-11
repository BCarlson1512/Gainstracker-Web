import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from 'zod'
import { prisma } from "~/server/db";
import  { userSchema, newUserSchema } from "../schemas/user";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure
    .query(async({ctx}) => {
        const users = await prisma.user.findMany({
            include: {
                sets: true,
                trainingPlans: true,
            },
            take: 100,
        });
        return users;
    }),
    getID: publicProcedure
    .input(
        z.object({
            id: z.string()
        })
        )
    .query(async({ctx, input}) => {
        const {id} = input
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
            include: {
                sets: true,
                trainingPlans: true,
            },
        });
        return user;
    }),
    createUser: publicProcedure
    .input(newUserSchema)
    .mutation(async({ctx, input}) => {
        const user = await prisma.user.create({
            data: {
                name: input.name,
            }
        });
        return user;
    }),
    updateUser: publicProcedure
    .input(
        userSchema
    )
    .mutation(async({ctx, input}) => {
        const {name, trainingPlans, sets} = input
        const user = await prisma.user.update({ //TODO: handle updating user sets
            where: {
                name: name
            },
            data: {
                name: input.name,
                trainingPlans: {
                    createMany: {
                        data: trainingPlans
                    }
                },
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