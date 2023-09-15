type Set = {
    weight: number,
    reps: number,
    unit: WeightUnit
    exerciseId?: string,
}

export type WeightUnit = "lbs" | "kg"

export default Set;