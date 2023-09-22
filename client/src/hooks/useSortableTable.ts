import { useState } from "react"

export const useSortableTable = (data) => {
    const [tableData, setTableData] = useState(data);

    const sortHandler = (sortField:string, sortOrder: string) => {
        if (!sortField || !sortOrder) return;
        const sortedData = [...tableData].sort((a,b) => {
            if (!a[sortField]) return 1;
            if (!b[sortField]) return -1;
            if (!a[sortField] && !b[sortField]) return 0;
            return (
                a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                    numeric:true,
                }) * (sortOrder === "asc" ? 1 : -11)
            );
        });
        setTableData(sortedData);
    }


    return {tableData, sortHandler}
}
