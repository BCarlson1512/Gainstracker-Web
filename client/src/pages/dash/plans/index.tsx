import Head from "next/head";
import DashNav from "~/components/dash/DashNav";
import { Table } from "~/components/table/Table";
import { api } from "~/utils/api";

const TableColumns = [
    {label: "Name", accessor: "name", sortable: false},
    {label: "Date Created", accessor: "dateCreated", sortable: false},
    {label: "Action", accessor: "action", sortable: false},
]

const Plans: React.FC = () => {
    const {data, isLoading} = api.trainingPlan.getByAuthedUID.useQuery()

    return (
        <>
            <Head>
                <title>Your Plans</title>
            </Head>
            <DashNav />
            <main className="flex-col-centered main-bg min-h-screen w-screen">
                <div className="flex-col-centered">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white">Training Plans</h1>
                </div>
                {(!isLoading && data) && (
                    <div className="relative overflow-x-auto">
                        <Table columns={TableColumns} data={data} type={"plan"}/>
                    </div>
                )}
            </main>
        </>
    )
}
export default Plans;