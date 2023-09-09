import { prisma } from "~/server/db";
import type Exercise from "~/types/Exercise";

export const populateExercise = async (exerciseList, uid) => {
    // create a list of exercises
    // skip dupes
    // return a list of id's to link (get existing id's as well)
    const createdExercises = await prisma.exercise.createMany({
        data: exerciseList,
        skipDuplicates: true
    })
}
