import { useSortableTable } from "~/hooks/useSortableTable"
import type { TableColumn, TableData } from "~/types/Table"
import { TableBody } from "./TableBody"
import { TableHead } from "./TableHead"

const defaultTableCols =  [
    {label: "Name", accessor: "name", sortable: true},
    {label: "Date", accessor: "dateCreated", sortable: true},
    {label: "Action", accessor: "action", sortable: false}
]

type TableProps = {
    data: TableData[]
    columns?: TableColumn[]
    type?: string
}

export const Table:React.FC<TableProps> = (props) => {
    const {data, columns, type} = props
    const {tableData, sortHandler} = useSortableTable(data);

    if (!data) return (<div> Loading... </div>)
    return (
        <table className="relative overflow-x-auto">
            <TableHead columns={columns ? columns : defaultTableCols}/>
            <TableBody columns={columns ? columns : defaultTableCols} tableData={tableData} type={type}/>
        </table>
    )
}
