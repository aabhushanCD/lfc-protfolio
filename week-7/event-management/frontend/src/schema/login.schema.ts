import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.email("Enter a valid Email address"),
  password: z.string().min(8, "Password must be 8 characters"),
});

export type LoginUserType = z.infer<typeof loginUserSchema>;
