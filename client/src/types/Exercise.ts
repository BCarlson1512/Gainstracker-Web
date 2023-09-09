import type Set from "./Set";

type Exercise = {
    name: string,
    muscleGrouping: string,
    numOfSets?: number,
    trainingId?: string | null,
    sets?: Set[]
}
export default Exercise;