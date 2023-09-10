import { z } from "zod";
import { setSchema } from "./set";
import { trainingPlanSchema } from "./trainingPlan";

export const userSchema = z.object({
    name: z.string(),
    trainingPlans: z.array(trainingPlanSchema),
    sets: z.array(setSchema),
});

export const newUserSchema = z.object({
    name: z.string(),
});