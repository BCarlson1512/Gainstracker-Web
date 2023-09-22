import { useSortableTable } from "~/hooks/useSortableTable"
import { TableBody } from "./TableBody"
import { TableHead } from "./TableHead"

const tableCols =  [
    {label: "Name", accessor: "name", sortable: true},
    {label: "Date", accessor: "dateCreated", sortable: true},
    {label: "Action", sortable: false}
]

type TableProps = {
    data: any[]
}

export const Table:React.FC<TableProps> = ({data}) => {
    const {tableData, sortHandler} = useSortableTable(data);
    if (!data) return (<div> Loading... </div>)
    return (
        <table>
            <TableHead columns={tableCols}/>
            <TableBody columns={tableCols} tableData={tableData}/>
        </table>
    )
}
