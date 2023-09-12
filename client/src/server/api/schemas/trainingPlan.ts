import { z } from "zod"
import { exerciseSchema } from "./exercise";

export const trainingPlanSchema = z.object({
    id: z.string(),
    name: z.string(),
    exercises: exerciseSchema,
});
