import type Exercise from "~/types/Exercise";
import type PlanData from "~/types/PlanData";
import ExerciseModal from "../dash/ExerciseModal";

type WorkoutCardProps = {
    workoutData: PlanData
    exerciseData: Exercise[]
}

export const WorkoutCard:React.FC<WorkoutCardProps> = ({workoutData, exerciseData}) => {
    const {name, notes} = workoutData;
    return (
        <div className="flex-col-centered py-4 my-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">{name}</h1>
            {notes && (
                <p>{notes}</p>
            )}
            {exerciseData.map((exercise, index) => {
                return <ExerciseModal key={index} index={index} exerciseData={exercise}/>
            })}
        </div>
    )
}
