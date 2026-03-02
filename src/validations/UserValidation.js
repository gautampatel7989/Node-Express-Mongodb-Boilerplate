import zod from "zod";

const createUserSchema = zod.object({
  name: zod.string().min(1, "Name is at least 2 characters long"),
  email: zod.email().toLowerCase(),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export { createUserSchema };
