import Head from "next/head";
import DashNav from "~/components/dash/DashNav";
import { Table } from "~/components/table/Table";
import { api } from "~/utils/api";

const workouts: React.FC = () => {
    const {data, isLoading} = api.workoutLog.getAuthedTableData.useQuery()

    return(
        <>
            <Head>
                <title> Your Workouts! </title>
            </Head>
            <DashNav />
            <main className="flex-col-centered main-bg min-h-screen w-screen">
                <div className="flex-col-x-center">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white">Workout Logs</h1>
                </div>
                {(!isLoading && data) && (
                    <div className="relative overflow-x-auto">
                        <Table data={data}/>
                    </div>
                )}
            </main>
        </>
    )
}

export default workouts;