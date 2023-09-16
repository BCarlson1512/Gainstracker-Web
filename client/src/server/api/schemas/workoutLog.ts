import { z } from "zod";
import { setSchema } from "./set";

export const workoutSchema = z.object({
    trainingPlanId: z.string(),
    sets: z.array(setSchema),
    notes: z.string(),
    name: z.string()
})