import { z } from "zod";

export const setSchema = z.object({
    weight: z.number().min(0),
    reps: z.number().min(0),
    unit: z.optional(z.string()),
    exerciseId: z.string(),
    userId: z.string(),
});
