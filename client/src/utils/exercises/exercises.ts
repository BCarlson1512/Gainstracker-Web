import { prisma } from "~/server/db";
import type Exercise from "~/types/Exercise";

/**
 * Workaround function for prisma upserting
 * Takes a list of exercises and a training plan id
 * upserts in database
 */
export const upsertExercises = (exercises: Exercise[], id:string) => {
    const dbExercises:Exercise[] = []
    exercises.map(async (exercise) => {
        const dbExercise = await prisma.exercise.upsert({
            where: {
                trainingId: id,
                id: exercise.id,
                name: exercise.name
            },
            update: {
                name: exercise.name,
                muscleGrouping: exercise.muscleGrouping,
                numOfSets: exercise.numOfSets
            },
            create: {
                name: exercise.name,
                muscleGrouping: exercise.muscleGrouping,
                numOfSets: exercise.numOfSets,
                trainingId: id
            }
        })
        dbExercises.push(dbExercise);
    })
    return dbExercises
}
