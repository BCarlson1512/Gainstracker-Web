import type { Column } from "~/types/Column"

type TableHeadProps = {
    columns: Column[]
}

export const TableHead:React.FC<TableHeadProps> = ({columns}) => {
    return (
        <thead className="text-xs text-white uppercase bg-slate-800 bg-opacity-10">
            <tr>
                {columns.map(({label, accessor}) => {
                    return(
                        <th 
                        key={accessor}
                        className="px-6 py-3"
                        >{label}</th>
                    )
                })}
            </tr>
        </thead>
    )
}
