import Head from "next/head";
import React, { useContext, useState } from "react";
import DashNav from "~/components/dash/DashNav";
import ExerciseModal from "~/components/dash/ExerciseModal";
import { PlanSelect } from "~/components/dash/plan/PlanSelect";
import type TrainingPlan from "~/types/TrainingPlan";
import { api } from "~/utils/api";
import { SetsContext } from "~/context/SetsContext";
import toast from "react-hot-toast";

const Log: React.FC = () => {
    {/*TODO: 
        Validate weights (No negative weights)
    */}
    const userTrainingPlans = api.trainingPlan.getByAuthedUID.useQuery();
    const [selectedPlan, setSelectedPlan] = useState<TrainingPlan|undefined>(undefined);
    const [logName, setLogName] = useState<string>("");
    const [logNotes, setLogNotes] = useState<string>("");
    const {setsData, setSetsData, setRemovedSets} = useContext(SetsContext)

    const {mutate} = api.workoutLog.createLog.useMutation({
        onSuccess: (ctx) => {
            toast.success("Successfully created log")
            setLogName("");
            setLogNotes("");
            setSetsData([]);
            setRemovedSets([])
            setSelectedPlan(undefined)
        },
        onError: (err) => {
            toast.error("Failed to create log")
        }
    })

    const handleSubmitChange = (id: string) => {
        const currPlan = userTrainingPlans.data?.find((plan) => plan.id === id)
        if (currPlan) {
            setSelectedPlan(currPlan);
        }
    }

    const handleSubmit = (e:React.SyntheticEvent<HTMLSelectElement>) => {
        e.preventDefault();
        if (selectedPlan?.id)
            mutate({workoutName: logName, trainingPlanId: selectedPlan?.id, sets: setsData, notes: logNotes})
    }

    return (
        <>
            <Head>
                <title>Log a workout</title>
            </Head>
            <DashNav />
            <main className="flex-col-centered main-bg min-h-screen w-screen">
                <div className="flex w-full flex-col gap-12 px-4 py-16">
                    <div className="flex-col-x-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">Log a new workout</h1>
                    </div>
                    <div className="flex-col-x-center">
                        <label className="input-label">Log Name</label>
                        <input className="input-field" defaultValue={logName} onBlur={(e) => setLogName(e.target.value)}></input>
                        <label className="input-label">Log Notes</label>
                        <input className="input-field" defaultValue={logNotes} onBlur={(e) => setLogNotes(e.target.value)}></input>
                        <button className="input-btn" onClick={(e) => handleSubmit(e)}>Create Log</button>
                    </div>
                    <PlanSelect trainingPlans={userTrainingPlans.data} handleChange={handleSubmitChange}/>
                    <div>
                        {selectedPlan?.exercises?.map((exercise, index) => {
                            return(
                            <ExerciseModal 
                                key={exercise.id}
                                index={index}
                                exerciseData={exercise}
                            />
                            )
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}
export default Log;