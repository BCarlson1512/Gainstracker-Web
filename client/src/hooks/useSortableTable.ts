import { useState } from "react"
import type { TableData } from "~/types/Table";

export const useSortableTable = (data:TableData[]) => {
    const [tableData, setTableData] = useState<TableData[]>(data);

    const sortHandler = (sortField:string, sortOrder: string) => {
        //TODO: Create specific table sort function
    }

    return {tableData, sortHandler, setTableData}
}
