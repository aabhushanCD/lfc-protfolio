import express from "express";
import {
  confirmVenueImageUploadUrlController,
  createEventController,
  createVenueImageUploadUrlController,
  deleteEventController,
  draftEventController,
  getEventByIdController,
  getEventsController,
  publishEventController,
  updateEventController,
  uploadBannerController,
} from "./event.controller.ts";
import { verifyToken } from "../../shared/middleware/requiredAuth.middleware.ts";
import { createEventSchema } from "./schema/createEvent.schema.ts";
import { updateEventSchema } from "./schema/updateEvent.schema.ts";

import { validate } from "../../shared/middleware/validation.middleware.ts";
import { fileUpload } from "../../shared/middleware/upload.middleware.ts";

const router = express.Router();
router.get("/draft", verifyToken, draftEventController);

router.get("/", getEventsController);
router.get("/:id", getEventByIdController);

router.post(
  "/",
  verifyToken,

  fileUpload.single("banner"),
  validate(createEventSchema),
  createEventController,
);

router.delete("/:id", verifyToken, deleteEventController);

router.patch("/:id/publish", verifyToken, publishEventController);

router.post(
  "/:id/banner",
  verifyToken,
  fileUpload.single("banner"),
  uploadBannerController,
);

router.post(
  "/:id/venue-image/upload-url",
  verifyToken,
  createVenueImageUploadUrlController,
);
router.patch(
  "/:id/venue-image",
  verifyToken,
  confirmVenueImageUploadUrlController,
);
router.put(
  "/:id",
  verifyToken,
  validate(updateEventSchema),
  updateEventController,
);
export default router;
