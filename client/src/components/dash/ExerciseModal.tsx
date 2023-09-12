import type Exercise from "~/types/Exercise";
import SetInput from "./inputs/SetsInput";

interface ExerciseModalProps {
    exerciseData: Exercise,
}
const ExerciseModal: React.FC<ExerciseModalProps> = (props) => {
    const {exerciseData} = props
    return(
        <div className="card-general flex flex-col p-2 m-2">
            <div className="">
                <h2>{exerciseData.name}</h2>
            </div>
            <div className="">
                <h3>{exerciseData.muscleGrouping}</h3>
            </div>
            <SetInput />
        </div>
    )
}
export default ExerciseModal;
