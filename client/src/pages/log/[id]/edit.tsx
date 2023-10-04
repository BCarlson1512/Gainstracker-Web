import Head from "next/head";
import { useRouter } from "next/router";
import { WorkoutCard } from "~/components/cards/WorkoutCard";
import DashNav from "~/components/dash/DashNav";
import { api } from "~/utils/api";

const Edit:React.FC = () => {
    const router = useRouter()
    const id = router.query.id
    if (!id) return <div>Loading...</div>

    const {data,isLoading} = api.workoutLog.getID.useQuery({id: id as string})
    
    return (
        <>
            <Head>
                <title>Edit Log</title>
            </Head>
            <DashNav />
            <main className="flex-col-centered main-bg min-h-screen w-screen">
                {(!isLoading && data?.workoutData && data?.exercises) && (
                    <WorkoutCard 
                    workoutData={data.workoutData} 
                    exerciseData={data.exercises}/>
                )}
            </main>
        </>
    )
}

export default Edit;
