import { delCache, getCache, setCache } from "../../cache/redis.cache.ts";
import { eventQueue } from "../../queues/event.queue.ts";
import { getImageUrl } from "../../shared/storage/minio.services.ts";
import { AppError } from "../../shared/utils/error.ts";
import { uploadToMinio } from "../../shared/utils/uploadToMinio.ts";
import { Event } from "./event.model.ts";
import { CreateEventDto } from "./schema/createEvent.schema.ts";
import { UpdateEventDto } from "./schema/updateEvent.schema.ts";

export const createEvent = async (
  data: CreateEventDto,
  organizerId: string,
  file?: Express.Multer.File,
) => {
  let bannerUrl: string | undefined;
  if (file) {
    bannerUrl = await uploadToMinio(file);
  }

  const event = await Event.create({
    ...data,
    bannerUrl,
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
  let bannerUrl = null;
  if (event.bannerUrl) {
    bannerUrl = await getImageUrl(event.bannerUrl);
  }
  return { ...event.toObject(), bannerUrl };
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
  file: Express.Multer.File,
  organizerId: string,
) => {
  let bannerUrl: string | undefined;
  if (file) {
    bannerUrl = await uploadToMinio(file);
  }
  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.createdBy.toString() !== organizerId) {
    throw new AppError("Unauthorized", 403);
  }

  event.bannerUrl = bannerUrl;

  await event.save();
  await delCache("events");
  return event;
};

export const draftEvents = async (userId: string) => {
  if (!userId) {
    throw new AppError("Unauthorized", 400);
  }
  const cached = await getCache("draft-event");
  if (cached) {
    console.log("CACHED HIT");
    return cached;
  }
  const events = await Event.find({ createdBy: userId, status: "draft" })
    .populate("createdBy", "name email")
    .sort({
      createdAt: -1,
    });
  await setCache("draft-event", events, 300);
  return events;
};
