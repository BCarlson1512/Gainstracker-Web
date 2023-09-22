import type { Column } from "~/types/Column"

type TableHeadProps = {
    columns: Column[]
}

export const TableHead:React.FC<TableHeadProps> = ({columns}) => {
    return (
        <thead>
            <tr>
                {columns.map(({label, accessor}) => {
                    return <th key={accessor}>{label}</th>
                })}
            </tr>
        </thead>
    )
}
