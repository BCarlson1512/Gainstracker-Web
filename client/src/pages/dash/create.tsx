import Head from "next/head";
import React, { useState } from "react";
import DashNav from "~/components/dash/DashNav";
import ExerciseInput from "~/components/dash/ExerciseInput";
import type Exercise from "~/types/Exercise";
import { api } from "~/utils/api";

const Create: React.FC = () => {
    {/*TODO: 
        Validate form
        API: Create new workout plan for user
    */}
    const [planName, setPlanName] = useState<string>("");
    const [planExercises, setPlanExercises] = useState<Exercise[]>([]);
    
    const {mutate} = api.trainingPlan.createTrainingPlan.useMutation({
        onSuccess: () => {
            console.log("Successfully created training plan")
        },
        onError: () => {
            console.log("Error creating training plan")
        }
    });

    const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({name:planName, author: "1", exercises: planExercises})
    }

    const handleExerciseClick = () => {
        const newExercise:Exercise = {name: "", muscleGrouping: "", numOfSets: 0}
        setPlanExercises([...planExercises, newExercise])
    }

    const updateExerciseData = (index:number, name:string|null, mg:string|null, sets?:number) => {
        const exercises = [...planExercises]
        const exercise = exercises.find((exerc, i) => index === i)
        if (exercise) {
            name ? exercise.name = name : null;
            mg ? exercise.muscleGrouping = mg : null;
            sets ? exercise.numOfSets = sets : null;
        }
        setPlanExercises(exercises)
        console.log(planExercises)
    }

    return(
        <>
            <Head>
                <title>Create a New Workout</title>
            </Head>
            <DashNav />
            <main className="flex flex-col items-center justify-center ml-24 px-8 min-h-screen w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="flex justify-center items-center py-8">
                    <h1 className="text-white font-bold text-3xl drop-shadow-sm">Create a New Training Plan</h1>
                </div>
                <div>
                    <form className="flex flex-col justify-center" onSubmit={(e) =>{handleSubmit(e)}}>
                        <div>
                            <label htmlFor="name" className="text-white px-2 mx-2">Plan name:</label>
                            <input id="name" className="text-slate-600 px-2 mx-2 border rounded-md" onBlur={(e) => setPlanName(e.target.value)} />
                        </div>
                        <div className="border rounded-md text-center p-2 m-2 text-white drop-shadow-sm hover:bg-[#33096e] hover:border-[#33096e] transition ease-in" onClick={handleExerciseClick}>Add an Exercise</div>
                        {planExercises.map((exercise, index) => {
                            return (
                                <ExerciseInput 
                                    key={index} 
                                    id={index} 
                                    name={exercise.name} 
                                    muscleGroup={exercise.muscleGrouping}
                                    handleChange={updateExerciseData}
                                />
                            )
                        })}
                        <button type="submit" className="flex justify-center items-center text-white border rounded-md p-2 m-2 text-center hover:bg-[#33096e] hover:border-[#33096e] transition ease-in">Create Training Plan</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Create;