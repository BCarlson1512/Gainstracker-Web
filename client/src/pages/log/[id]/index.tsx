import Head from "next/head";
import { useRouter } from "next/router";
import { WorkoutCard } from "~/components/cards/WorkoutCard";
import DashNav from "~/components/dash/DashNav";
import { api } from "~/utils/api";

const View:React.FC = () => {
    const router = useRouter()
    const {id} = router.query
    if (!id) return <div>Loading...</div>

    const {data,isLoading} = api.workoutLog.getID.useQuery({id: id})

    return (
        <>
            <Head>
                <title>Edit Log</title>
            </Head>
            <DashNav />
            <main className="flex-col-centered main-bg min-h-screen w-screen">
                {(!isLoading && data) && (
                    <WorkoutCard workoutData={data.workoutData} exerciseData={data.exercises}/>
                )}
            </main>
        </>
    )
}

export default View;
