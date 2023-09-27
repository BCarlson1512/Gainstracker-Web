import type WorkoutSet from "./WorkoutSet";

type Exercise = {
    id?: string,
    name: string,
    muscleGrouping: string,
    numOfSets?: number,
    trainingId?: string | null,
    sets?: WorkoutSet[]
}
export default Exercise;