import Head from "next/head";
import { useState } from "react";
import DashNav from "~/components/dash/DashNav";
import ExerciseModal from "~/components/dash/ExerciseModal";
import { PlanSelect } from "~/components/dash/plan/PlanSelect";
import type TrainingPlan from "~/types/TrainingPlan";
import { api } from "~/utils/api";

const Log: React.FC = () => {
    {/*TODO: 
        Allow user to add/remove sets
        Validate weights (No negative weights)
        API: Ship workout off to DB
    */}
    const userTrainingPlans = api.trainingPlan.getByAuthedUID.useQuery();
    const [selectedPlan, setSelectedPlan] = useState<TrainingPlan|undefined>(undefined);

    const handleSubmitChange = (id: string) => {
        const currPlan = userTrainingPlans.data?.find((plan) => plan.id === id)
        if (currPlan) {
            setSelectedPlan(currPlan);
        }
    }

    return (
        <>
            <Head>
                <title>Log a workout</title>
            </Head>
            <DashNav />
            <main className="flex min-h-screen w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="flex w-full flex-col gap-12 px-4 py-16">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">Log a new workout</h1>
                    </div>
                    <PlanSelect trainingPlans={userTrainingPlans.data} handleChange={handleSubmitChange}/>
                    <div>
                        {selectedPlan?.exercises?.map((exercise, index) => {
                            return(
                            <ExerciseModal 
                                key={index}
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