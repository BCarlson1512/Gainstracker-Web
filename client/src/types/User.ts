import type Set from "./Set";
import type TrainingPlan from "./TrainingPlan";

type User = {
    id: number,
    name: string,
    trainingPlans?: TrainingPlan[]
    sets?: Set[]
}

export default User;