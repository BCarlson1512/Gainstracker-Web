import { useEffect, useState } from "react";
import type Exercise from "~/types/Exercise";

export const useExercises = () => {
    const [planExercises, setPlanExercises] = useState<Exercise[]>([]);
    
    const removeExercise = (index: number) => {
        const copyArr = [...planExercises]
        copyArr.splice(index,1)
        setPlanExercises(copyArr)
    }

    const handleClick = () => {
        const newExercise:Exercise = {name: "", muscleGrouping: "", numOfSets: 0}
        setPlanExercises([...planExercises, newExercise])
    }

    const mutateExerciseData = (index:number, name:string|null, mg:string|null, sets?:number) => {
        const exercises = [...planExercises]
        const exercise = exercises.find((exerc, i) => index === i)
        if (exercise) {
            name ? exercise.name = name : null;
            mg ? exercise.muscleGrouping = mg : null;
            sets ? exercise.numOfSets = sets : null;
        }
        setPlanExercises(exercises)
    }

    useEffect(() => {
    }, [planExercises])

    return {planExercises, removeExercise, handleClick, mutateExerciseData}
}