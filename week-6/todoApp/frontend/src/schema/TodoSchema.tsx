import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  completed: z.boolean(),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
