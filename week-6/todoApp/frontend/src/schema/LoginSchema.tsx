import { z } from "zod";
export const LoginSchema = z.object({
  email: z.string().email("Please Enter a valid email"),
  password: z.string().min(8, "Password must be greater"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
