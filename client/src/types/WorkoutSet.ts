type WorkoutSet = {
    id: string,
    exerciseId: string
    workoutId: string
    userId: string | null
    weight: number
    reps: number
    unit: string
    notes: string | null
}

export default WorkoutSet;
