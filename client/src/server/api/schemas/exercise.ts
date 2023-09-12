import { z } from "zod"

export const exerciseSchema = z
.array(
    z.object({
        id: z.optional(z.string()),
        name: z.string(),
        muscleGrouping: z.string(),
        numOfSets: z.number(),
    }
));
