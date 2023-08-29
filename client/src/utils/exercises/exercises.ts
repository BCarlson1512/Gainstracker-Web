import { prisma } from "~/server/db";

export const populateExercise = (exerciseList, tid) => {
    exerciseList.forEach(async(exercise) => {
        const foundExercise = await prisma.exercise.findFirst({
            where: {
                name: exercise.name
            },
        });
        !foundExercise? await prisma.exercise.create({
            data: {
                name: exercise.name,
                muscleGrouping: exercise.muscleGrouping,
                trainingId: tid
            }
        }): null
    })
}
