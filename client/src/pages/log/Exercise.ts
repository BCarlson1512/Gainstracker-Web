import type Set from "./Set";

type Exercise = {
    name: string,
    muscleGrouping: string,
    numOfSets: number,
    sets?: Set[]
}
export default Exercise;