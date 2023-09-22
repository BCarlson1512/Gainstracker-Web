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
                    <tr key={data.id}>
                        {columns.map(({accessor}) => {
                            if (accessor === "dateCreated") {
                                const tData = data[accessor] ? data[accessor].toString().substring(4, 15): "--"
                                return <td key={accessor}>{tData}</td>
                            } else {
                                const tData = data[accessor] ? data[accessor] : "--"
                                return <td key={accessor}>{tData}</td>
                            }
                        })}
                    </tr>
                )})}
        </tbody>
    )
}