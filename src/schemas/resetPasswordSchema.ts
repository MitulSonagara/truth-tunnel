import { z } from "zod";

export const resetPasswordSchema = z.object({
    password: z.string(),
    confirmPassword:z.string()
})