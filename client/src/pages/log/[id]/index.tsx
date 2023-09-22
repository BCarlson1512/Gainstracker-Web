import Head from "next/head";
import { useRouter } from "next/router";
import { WorkoutCard } from "~/components/cards/WorkoutCard";
import DashNav from "~/components/dash/DashNav";
import { api } from "~/utils/api";

const View:React.FC = () => {
    const router = useRouter()
    const {id} = router.query
    if (!id) return <div>Loading...</div>

    const {data} = api.workoutLog.getID.useQuery({id: id})
    const {workoutData, exercises} = data;
    return (
        <>
            <Head>
                <title>Edit Log</title>
            </Head>
            <DashNav />
            <main className="flex-col-centered main-bg min-h-screen w-screen">
                {workoutData && (
                    <WorkoutCard workoutData={workoutData} exerciseData={exercises}/>
                )}
            </main>
        </>
    )
}

export default View;
