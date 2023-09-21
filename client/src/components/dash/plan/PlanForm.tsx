import { useState } from "react";
import type Exercise from "~/types/Exercise"
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import ExerciseInput from "../ExerciseInput";
import type TrainingPlan from "~/types/TrainingPlan";
import { PlanSelect } from "./PlanSelect";

type PlanFormProps = {
    userId: string
    isCreateMode: boolean
}

export const PlanForm: React.FC<PlanFormProps> = (props) => {
    {/*TODO: 
        Validate form
    */}
    const [planName, setPlanName] = useState<string>("");
    const [planExercises, setPlanExercises] = useState<Exercise[]>([]);
    const [removedExercises, setRemovedExercises] = useState<string[]>([]);
    const [currentPlan, setCurrentPlan] = useState<TrainingPlan|undefined>(undefined);
    const {isCreateMode} = props;

    const userTrainingPlans = api.trainingPlan.getByAuthedUID.useQuery();

    const {mutate} = isCreateMode ? 
    api.trainingPlan.createTrainingPlan.useMutation({
        onSuccess: () => {
            toast.success("Successfully created training plan!")
            setPlanName("");
            setPlanExercises([]);
        },
        onError: () => {
            toast.error("Failed to create training plan")
        }
    })
    :
    api.trainingPlan.updateTrainingPlan.useMutation({
        onSuccess: () => {
            toast.success("Successfully updated training plan!")
            setPlanName("");
            setPlanExercises([]);
            setCurrentPlan(undefined)
        },
        onError: () => {
            toast.error("Failed to update training plan")
        }
    });

    const deleteExercises = api.trainingPlan.deleteTrainingPlanExercises.useMutation({
        onSuccess: () => {
            toast.success("Successfully removed exercises!");
            setRemovedExercises([])
        },
        onError: () => {
            toast.error("Failed to remove exercises!")
        }
    })

    const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isCreateMode) {
            mutate({name:planName, id: "", exercises: planExercises})
        } else {
            mutate({id: currentPlan?.id, name:planName, exercises: planExercises})
            removedExercises.length > 0 ? deleteExercises.mutate({removedExerciseIds: removedExercises}) : null
        }
    }

    const removeExercise = (index: number) => {
        const copyArr = [...planExercises]
        const removedExercise = copyArr.splice(index,1)[0]
        !isCreateMode && removedExercise?.id ? setRemovedExercises([...removedExercises, removedExercise.id]) : null
        setPlanExercises(copyArr)
    }

    const handleClick = () => {
        const newExercise:Exercise = {name: "", muscleGrouping: "", numOfSets: 0}
        setPlanExercises([...planExercises, newExercise])
    }

    const mutateExerciseData = (index:number, name:string|null, mg:string|null, sets?:number) => {
        const exercises = [...planExercises]
        const exercise = exercises.find((exerc, i) => index === i)
        if (exercise) {
            name ? exercise.name = name : null;
            mg ? exercise.muscleGrouping = mg : null;
            sets ? exercise.numOfSets = sets : null;
        }
        setPlanExercises(exercises)
    }

    const handleSubmitChange = (id:string) => {
        const currPlan = userTrainingPlans.data?.find((plan) => plan.id === id)

        if (currPlan) { // populate plan data 
            setPlanName(currPlan.name);
            setPlanExercises(currPlan.exercises)
            setCurrentPlan(currPlan);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex-centered py-8">
                <h1 className="text-white font-bold text-3xl drop-shadow-sm">{isCreateMode ? "Create a New" : "Update"} Training Plan</h1>
            </div>
            {!isCreateMode && (
                <PlanSelect trainingPlans={userTrainingPlans.data} handleChange={handleSubmitChange} />
            )}
            <form className="flex flex-col justify-center" onSubmit={(e) =>{handleSubmit(e)}}>
                <div className="flex flex-col items-center justify-center pb-2">
                    <label htmlFor="name" className="text-white px-2 mx-2">Plan name:</label>
                    <input id="name" className="text-slate-600 px-2 mx-2 border rounded-md" defaultValue={planName} onBlur={(e) => setPlanName(e.target.value)} />
                </div>
                <div className="flex justify-center items-center p-2">                
                    <div className="border rounded-md text-center p-2 m-2 text-white drop-shadow-sm hover:bg-slate-800 hover:border-slate-800 transition ease-in" onClick={handleClick}>Add an Exercise</div>
                    <button type="submit" className="flex justify-center items-center text-white border rounded-md p-2 m-2 text-center hover:bg-slate-800 hover:border-slate-800 transition ease-in">{isCreateMode? "Create" : "Update"} Training Plan</button>
                </div>
                {planExercises.map((exercise, index) => {
                    return (
                        <ExerciseInput 
                            key={index} 
                            id={index} 
                            name={exercise.name}
                            data={exercise}
                            muscleGroup={exercise.muscleGrouping}
                            handleChange={mutateExerciseData}
                            handleRemove={removeExercise}
                        />
                    )
                })}
                
            </form>
        </div>
    )
}