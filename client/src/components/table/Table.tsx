import { useSortableTable } from "~/hooks/useSortableTable"
import { TableBody } from "./TableBody"
import { TableHead } from "./TableHead"

const tableCols =  [
    {label: "Name", accessor: "workout_name", sortable: true},
    {label: "Date", accessor: "creation_date", sortable: true},
    {label: "Exercises", accessor: "num_of_exercises", sortable: true},
    {label: "Sets", accessor: "num_of_sets", sortable: true},
]

type TableProps = {
    data: any[]
}

export const Table:React.FC<TableProps> = ({data}) => {
    const {tableData, sortHandler} = useSortableTable(data);
    return (
        <table>
            <TableHead columns={tableCols}/>
            <TableBody columns={tableCols} tableData={tableData}/>
        </table>
    )
}
