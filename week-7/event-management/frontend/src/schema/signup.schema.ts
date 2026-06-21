import { z } from "zod";

export const signupUserSchema = z.object({
  name: z.string().trim().min(3, "Name must be greate than 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be greater than 8 characters"),
});

export type SignupUserType = z.infer<typeof signupUserSchema>;
