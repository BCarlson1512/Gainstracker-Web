export type TableColumn = {
    label: string
    accessor: string
    sortable: boolean
}

export type TableSet = {
    id: string;
    exerciseId: string;
    workoutId: string;
    userId: string | null;
    weight: number;
    reps: number;
    unit: string;
    notes: string | null;
}
export type TableCount = {
    sets: number
}

export type TableData = {
    id: string
    dateCreated?: Date
    _count?: TableCount
    sets?: TableSet[]
}
