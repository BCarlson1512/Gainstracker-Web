import Link from "next/link"
import toast from "react-hot-toast"
import { AiOutlineDelete } from "react-icons/ai"
import { CiViewList } from "react-icons/ci"
import { MdOutlineModeEditOutline } from "react-icons/md"
import type { Column } from "~/types/Column"
import { api } from "~/utils/api"

type TableSet = {
    id: string;
    exerciseId: string;
    workoutId: string;
    userId: string | null;
    weight: number;
    reps: number;
    unit: string;
    notes: string | null;
}

type TableData = {
    id: string
    dateCreated: string
    sets: TableSet[]
}

type TableBodyProps = {
    columns: Column[]
    tableData: TableData[]
}

export const TableBody:React.FC<TableBodyProps> = ({columns, tableData}) => {
    return (
        <tbody>
            {tableData.map((data) => {
                return (
                    <tr
                    className="border-b border-white text-white" 
                    key={data.id}>
                        {columns.map(({accessor}) => {
                            if (!accessor) {

                            } else if (accessor === "dateCreated") {
                                const tData = data[accessor] ? data[accessor].toString().substring(4, 15): "--"
                                return <td className="px-6 py-4 font-medium whitespace-nowrap" key={accessor}>{tData}</td>
                            } else if (accessor === "action"){
                                return <ActionRow key={accessor} id={data.id} />
                            }else {
                                const tData = data[accessor] ? data[accessor] : "--"
                                return <td className="px-6 py-4 font-medium whitespace-nowrap" key={accessor}>{tData}</td>
                            }
                        })}
                    </tr>
                )})}
        </tbody>
    )
}

type ActionRowProps = {
    id: string
}

const ActionRow:React.FC<ActionRowProps> = ({id}) => {
    
    const {mutate} = api.workoutLog.deleteLog.useMutation({
        onSuccess: () => {
            toast.success("Successfully deleted log")
        },
        onError: (err) => {
            toast.error("Failed to delete log")
        }
    })

    const deleteLogHandler = () => {
        mutate({id: id})
    }

    return (
        <td className="flex items-center justify-center">
            <AiOutlineDelete size="28" onClick={deleteLogHandler}/>
            <Link
                href={`/log/${id}/edit`}
            >
                <MdOutlineModeEditOutline size="28"/>
            </Link>
            <Link
                href={`/log/${id}`}
            >
                <CiViewList size="28"/>
            </Link>
        </td>
    )
}
