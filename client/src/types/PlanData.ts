import type WorkoutSet from "./WorkoutSet"

type PlanData = {
    id: string
    dateCreated: Date
    name: string
    authorId: string
    trainingPlanId: string
    notes: string | null
    sets: WorkoutSet[]
}

export default PlanData;