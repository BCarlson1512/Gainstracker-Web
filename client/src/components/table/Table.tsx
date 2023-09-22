import { useSortableTable } from "~/hooks/useSortableTable"
import { TableBody } from "./TableBody"
import { TableHead } from "./TableHead"

const defaultTableCols =  [
    {label: "Name", accessor: "name", sortable: true},
    {label: "Date", accessor: "dateCreated", sortable: true},
    {label: "Action", accessor: "action", sortable: false}
]

type TableColumn = {
    label: string
    accessor: string
    sortable: boolean
}

type TableProps = {
    data: any[]
    columns?: TableColumn[]
}

export const Table:React.FC<TableProps> = (props) => {
    const {data, columns} = props
    const {tableData, sortHandler} = useSortableTable(data);

    if (!data) return (<div> Loading... </div>)
    return (
        <table className="relative overflow-x-auto">
            <TableHead columns={columns ? columns : defaultTableCols}/>
            <TableBody columns={columns ? columns : defaultTableCols} tableData={tableData}/>
        </table>
    )
}
