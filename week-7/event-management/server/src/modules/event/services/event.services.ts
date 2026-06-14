import { delCache, getCache, setCache } from "../../../cache/redis.cache.ts";
import { eventQueue } from "../../../queues/event.queue.ts";
import { AppError } from "../../../shared/utils/error.ts";
import { Event } from "../model/event.model.ts";
import { CreateEventDto } from "../schema/createEvent.schema.ts";
import { UpdateEventDto } from "../schema/updateEvent.schema.ts";

export const createEvent = async (
  data: CreateEventDto,
  organizerId: string,
) => {
  const event = await Event.create({
    ...data,
    createdBy: organizerId,
  });
  await delCache("events");

  return event;
};

export const getPublishedEvents = async () => {
  const cached = await getCache("events");
  if (cached) {
    console.log("CACHED HIT");
    return cached;
  }
  console.log("CACHED MISS");
  const events = await Event.find({
    status: "published",
  })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  await setCache("events", events, 300);

  return events;
};

export const getEventById = async (id: any) => {
  const event = await Event.findById(id).populate("createdBy", "name email");

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

export const updateEvent = async (
  id: any,
  data: UpdateEventDto,
  organizerId: string,
) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.createdBy.toString() !== organizerId) {
    throw new AppError("Unauthorized", 403);
  }

  Object.assign(event, data);

  await event.save();
  await delCache("events");
  return event;
};

export const deleteEvent = async (id: any, organizerId: string) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.createdBy.toString() !== organizerId) {
    throw new AppError("Unauthorized", 403);
  }

  await event.deleteOne();
  await delCache("events");
  return {
    message: "Event deleted successfully",
  };
};

export const publishEvent = async (id: any, organizerId: string) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.createdBy.toString() !== organizerId) {
    throw new AppError("Unauthorized", 403);
  }

  if (event.status === "published") {
    throw new AppError("Event is already published", 400);
  }

  event.status = "published";

  await event.save();
  await delCache("events");
  await eventQueue.add("notify-subscribers", {
    eventId: event._id,
    title: event.title,
  });
  return event;
};

export const uploadBanner = async (
  eventId: any,
  filePath: string,
  organizerId: string,
) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.createdBy.toString() !== organizerId) {
    throw new AppError("Unauthorized", 403);
  }

  event.bannerUrl = filePath;

  await event.save();
  await delCache("events");
  return event;
};
