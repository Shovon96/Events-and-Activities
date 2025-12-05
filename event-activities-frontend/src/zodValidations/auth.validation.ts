import z from 'zod'

export const createUserValidationSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(6, "Password must be 6+ chars"),
    fullName: z.string().min(2, "Name is required"),
    profileImage: z.string().optional(),
    bio: z.string().optional(),
    interests: z.array(z.string()).optional(),
    city: z.string().optional(),
    role: z.enum(["USER", "HOST", "ADMIN"]).default("USER"),
});

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});