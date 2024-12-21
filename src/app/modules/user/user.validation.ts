import { z } from 'zod';

export const registerValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    role: z.enum(['admin', 'user']).optional(),
    isBlocked: z.boolean().optional(),
});

export type RegisterDTO = z.infer<typeof registerValidationSchema>;