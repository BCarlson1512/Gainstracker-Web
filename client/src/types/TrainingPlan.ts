import type Exercise from "./Exercise";

type TrainingPlan = {
    dateCreated?: Date,
    id?: string,
    authorId?: string,
    name: string,
    exercises?: Exercise[]
}

export default TrainingPlan;