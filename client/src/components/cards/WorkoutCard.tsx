import ExerciseModal from "../dash/ExerciseModal";

type WorkoutCardProps = {
    workoutData: any[]
    exerciseData: any[]
}

export const WorkoutCard:React.FC<WorkoutCardProps> = ({workoutData, exerciseData}) => {
    const {name, notes} = workoutData;
    return (
        <div className="flex-col-centered">
            <h1>{name}</h1>
            {exerciseData.map((exercise, index) => {
                return <ExerciseModal key={index} index={index} exerciseData={exercise}/>
            })}
        </div>
    )
}
