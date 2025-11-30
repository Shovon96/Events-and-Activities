import { z } from "zod";

export const createUserValidationSchema = z.object({
    email: z.string().nonempty("Email is required"),
    password: z.string().min(6, "Password must be 6+ chars"),
    fullName: z.string().min(2, { error: "Name is required" }),
    profileImage: z.string().optional(),
    interests: z.array(z.string()).optional(),
    city: z.string().optional(),
    role: z.enum(["USER", "HOST", "ADMIN"]).default("USER"),
});

export const UserValidation = {
    createUserValidationSchema
}