import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")
    .regex(/^[a-z0-9_]+$/, "Username must not contain capital letters")

export const passwordValidation = z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@, $, !, %, *, ?, &)" });
    
    export const signUpSchema = z.object({
        username: usernameValidation,
        email: z.string().email({ message: "Invalid email address" }),
        password: passwordValidation,
        confirmPassword: z.string()
      }).refine((data: { password: string; confirmPassword: string }) => {
        return data.password === data.confirmPassword; // Check if passwords match
      }, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Error message linked to confirmPassword
      });