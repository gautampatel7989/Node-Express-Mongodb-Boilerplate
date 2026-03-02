import z from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100),
});

export { loginSchema };
