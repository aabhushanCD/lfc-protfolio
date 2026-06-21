import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3 } from "../../config/minio.ts";
import { AppError } from "../../shared/utils/error.ts";
import { Event } from "../../modules/event/event.model.ts";

export const getImageUrl = async (objectKey: string) => {
  return await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.MINIO_BUCKET!,
      Key: objectKey,
    }),
    {
      expiresIn: 60,
    },
  );
};

export const createVenueImageUploadUrl = async (
  eventId: any,
  userId: string,
  contentType: string,
) => {
  const allowed = ["image/jpeg", "image/png"];

  if (!allowed.includes(contentType)) {
    throw new AppError("Only JPEG and PNG images are allowed", 400);
  }

  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.createdBy.toString() !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  const extension = contentType === "image/png" ? "png" : "jpg";

  const objectKey = `venues/${eventId}/${Date.now()}.${extension}`;

  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: process.env.MINIO_VENUE_BUCKET!,
      Key: objectKey,
      ContentType: contentType,
    }),
    { expiresIn: 300 },
  );

  return {
    uploadUrl,
    objectKey,
    expiresIn: 300,
  };
};

export const saveVenueImageKey = async (
  eventId: any,
  userId: string,
  objectKey: string,
) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.createdBy.toString() !== userId) {
    throw new AppError("Unauthorized", 403);
  }

  event.venueImageKey = objectKey;

  await event.save();

  return event;
};
