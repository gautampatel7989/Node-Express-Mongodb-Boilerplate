import z from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100),
});

const registerSchema = z.object({
  name: z.string().min(1, "The name is required"),
  email: z.email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100),
});

export { loginSchema, registerSchema };
