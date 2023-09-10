import { z } from "zod"
import { exerciseSchema } from "./exercise";

export const trainingPlanSchema = z.object({
    id: z.optional(z.string()),
    name: z.string(),
    exercises: exerciseSchema,
    authorId: z.string()
});
