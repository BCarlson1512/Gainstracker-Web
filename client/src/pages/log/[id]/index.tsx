import Head from "next/head";
import { useRouter } from "next/router";
import DashNav from "~/components/dash/DashNav";
import { Table } from "~/components/table/Table";
import { api } from "~/utils/api";

const viewTableCols = [
    {label:"Name", accessor: "name", sortable: true},
    {label:"Muscle Group", accessor: "muscleGrouping", sortable: true},
    {label: "Weight", accessor: "weight", sortable: true},
    {label: "Reps", accessor: "reps", sortable: true},
    {label: "Notes", accessor: "notes", sortable: false},
]

const View:React.FC = () => {
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
                {(isLoading) && (
                    <div>Loading...</div>
                )}
                {(!isLoading && data?.exercises) && 
                (
                    <Table 
                    data={data.exercises} 
                    columns={viewTableCols}
                    />
                )}
            </main>
        </>
    )
}

export default View;
