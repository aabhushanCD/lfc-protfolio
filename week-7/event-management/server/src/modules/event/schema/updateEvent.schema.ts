import { z } from "zod";

import { createEventSchema } from "./createEvent.schema.ts";

export const updateEventSchema = createEventSchema.partial();

export type UpdateEventDto = z.infer<typeof updateEventSchema>;
