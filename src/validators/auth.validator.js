import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot exceed 30 characters"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "password must be at most 100 characters"),

  role: z.enum(["admin", "staff", "customer"], {
    message: "Invalid role",
  }),

  phone: z.string(),
});
