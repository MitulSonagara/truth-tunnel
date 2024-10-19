import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")
    .regex(/^[a-z0-9_]+$/, "Username must not contain capital letters")
    
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z
        .string()
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be atleast 6 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // Uppercase letter
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // Lowercase letter
        .regex(/\d/, { message: "Password must contain at least one digit" }) // At least one digit
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }) // At least one special character
})