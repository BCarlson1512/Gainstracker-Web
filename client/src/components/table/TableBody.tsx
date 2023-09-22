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
                            const tData = data[accessor] ? data[accessor] : "--"
                            return <td key={accessor}>{tData}</td>
                        })}
                    </tr>
                )})}
        </tbody>
    )
}