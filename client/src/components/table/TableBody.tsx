import { AiOutlineDelete } from "react-icons/ai"
import { CiViewList } from "react-icons/ci"
import { MdOutlineModeEditOutline } from "react-icons/md"
import type { Column } from "~/types/Column"

type TableBodyProps = {
    columns: Column[]
    tableData: any[]
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
                            if (accessor === "dateCreated") {
                                const tData = data[accessor] ? data[accessor].toString().substring(4, 15): "--"
                                return <td className="px-6 py-4 font-medium whitespace-nowrap" key={accessor}>{tData}</td>
                            } else if (accessor === "action"){
                                return <ActionRow key={accessor} />
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

const ActionRow = () => {
    return (
        <td className="flex items-center justify-center">
            <AiOutlineDelete />
            <MdOutlineModeEditOutline />
            <CiViewList />
        </td>
    )
}
