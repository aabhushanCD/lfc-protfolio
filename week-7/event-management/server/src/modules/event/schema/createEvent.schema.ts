import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  date: z.coerce.date({
    error: "Invalid event date",
  }),

  venue: z.string().trim().min(3, "Venue is required"),

  capacity: z.number().int().positive("Capacity must be greater than 0"),

  status: z.enum(["draft", "published"]).default("draft"),
});

export type CreateEventDto = z.infer<typeof createEventSchema>;
