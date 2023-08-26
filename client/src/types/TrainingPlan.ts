import type Exercise from "./Exercise";

type TrainingPlan = {
    date: string,
    name: string,
    exercises: Exercise[]
}

export default TrainingPlan;