import Head from "next/head";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DashNav from "~/components/dash/DashNav";
import ExerciseInput from "~/components/dash/ExerciseInput";
import { useExercises } from "~/hooks/useExercises";
import type TrainingPlan from "~/types/TrainingPlan";
import { api } from "~/utils/api";

const Edit: React.FC = () => {
    {/*TODO: 
        Validate form
    */}
    const [planName, setPlanName] = useState<string>("");
    const [currentPlan, setCurrentPlan] = useState<TrainingPlan|undefined>(undefined);
    const {planExercises, removeExercise, handleClick, mutateExerciseData} = useExercises();
    
    const userTrainingPlans = api.trainingPlan.getAll.useQuery(); //TODO: Change this to getByUserID once auth has been setup

    const {mutate} = api.trainingPlan.updateTrainingPlan.useMutation({
        onSuccess: () => {
            toast.success("Successfully updated training plan!")
        },
        onError: () => {
            toast.error("Failed to update training plan")
        }
    });

    const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({name:planName, exercises: planExercises, id: "1"})
    }

    const handleChange = (id:string) => {
        const currPlan = userTrainingPlans.data?.find((plan) => plan.id === id)
        setCurrentPlan(currPlan);
        if (currPlan) { // populate plan data 
            setPlanName(currPlan.name);
        }
    }

    return(
        <>
            <Head>
                <title>Edit Training Plan</title>
            </Head>
            <DashNav />
            <main className="flex flex-col items-center justify-center ml-24 px-8 min-h-screen w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="flex justify-center items-center py-8">
                    <h1 className="text-white font-bold text-3xl drop-shadow-sm">Modify Training Plan</h1>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-white font-semibold text-2xl drop-shadow-sm">Choose a Training Plan</h3>
                    <select name="training-plans" id="training-plans" onChange={(e) => handleChange(e.target.value)}>
                        {userTrainingPlans.data?.map((plan) =>
                            <option key={plan.id} value={plan.id}>{plan.name}</option>
                        )}
                    </select>
                </div>
                {currentPlan && (
                    <div>
                        <form className="flex flex-col justify-center" onSubmit={(e) =>{handleSubmit(e)}}>
                            <div>
                                <label htmlFor="name" className="text-white px-2 mx-2">Plan name:</label>
                                <input id="name" className="text-slate-600 px-2 mx-2 border rounded-md" value={planName} onChange={(e) => setPlanName(e.target.value)} />
                            </div>
                            <div className="border rounded-md text-center p-2 m-2 text-white drop-shadow-sm hover:bg-[#33096e] hover:border-[#33096e] transition ease-in" onClick={handleClick}>Add an Exercise</div>
                            {planExercises.map((exercise, index) => {
                                return (
                                    <ExerciseInput 
                                        key={index}
                                        id={index} 
                                        name={exercise.name} 
                                        muscleGroup={exercise.muscleGrouping}
                                        handleChange={mutateExerciseData}
                                        handleRemove={removeExercise}
                                    />
                                )
                            })}
                            <button type="submit" className="flex justify-center items-center text-white border rounded-md p-2 m-2 text-center hover:bg-[#33096e] hover:border-[#33096e] transition ease-in">Create Training Plan</button>
                        </form>
                    </div>
                    )
                }
            </main>
        </>
    )
}

export default Edit;