import { z } from "zod";

export const createAuthSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type CreateAuthInput = z.infer<typeof createAuthSchema>;
