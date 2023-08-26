import Head from "next/head";
import { useState } from "react";
import DashNav from "~/components/dash/DashNav";
import ExerciseInput from "~/components/dash/ExerciseInput";
import type Exercise from "~/types/Exercise";

const Create: React.FC = () => {
    {/*TODO: 
        Validate form
        API: Create new workout plan for user
    */}
    const [planName, setPlanName] = useState<string>("");
    const [planExercises, setPlanExercises] = useState<Exercise[]>([]);

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
            <main className="flex flex-col ml-24 px-8">
                <div>
                    <h1>Create a New Training Plan</h1>
                </div>
                <form onSubmit={() => {return;}}>
                    <div>
                        <label htmlFor="name">Plan name:</label>
                        <input id="name" onBlur={(e) => setPlanName(e.target.value)} />
                    </div>
                    <div onClick={handleExerciseClick}>Add an Exercise</div>
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
                </form>
            </main>
        </>
    )
}

export default Create;