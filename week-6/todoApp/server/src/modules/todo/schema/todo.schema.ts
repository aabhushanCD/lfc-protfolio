import { z } from "zod";

export const createTodoSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
