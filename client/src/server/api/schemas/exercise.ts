import { z } from "zod"

export const exerciseSchema = z
.array(
    z.object({
        name: z.string(),
        muscleGrouping: z.string(),
    }
));
