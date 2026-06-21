import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string("Title is required")
    .min(3, "Must be greater than three character"),
  description: z
    .string()
    .min(10, "Description must be greater than 10 character"),
  date: z.string(),
  venue: z.string("Please enter a location where is your event happening"),
  capacity: z.number().min(0).positive(),
  status: z.enum(["draft", "published"]),
  banner: z.instanceof(File),
});

export const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  date: z.date().optional(),
  venue: z.string().optional(),
  capacity: z.number().min(0).optional(),
  status: z.enum(["draft", "published"]),
  banner: z.instanceof(File).optional(),
});

export type CreateEventType = z.infer<typeof createEventSchema>;

export type UpdateEventType = z.infer<typeof updateEventSchema>;
