import express from "express";

import {
  createEventController,
  getEventsController,
  getEventByIdController,
  updateEventController,
  deleteEventController,
  publishEventController,
  uploadBannerController,
} from "../controller/event.controller.ts";

import { validate } from "../../../shared/middleware/validation.middleware.ts";
import { verifyToken } from "../../../shared/middleware/requiredAuth.middleware.ts";
import { upload } from "../../../shared/middleware/upload.middleware.ts";

import { createEventSchema } from "../schema/createEvent.schema.ts";
import { updateEventSchema } from "../schema/updateEvent.schema.ts";

const router = express.Router();

router.get("/", getEventsController);
router.get("/:id", getEventByIdController);

router.post(
  "/",
  verifyToken,
  validate(createEventSchema),
  createEventController,
);

router.put(
  "/:id",
  verifyToken,
  validate(updateEventSchema),
  updateEventController,
);

router.delete("/:id", verifyToken, deleteEventController);

router.patch("/:id/publish", verifyToken, publishEventController);

router.post(
  "/:id/banner",
  verifyToken,
  upload.single("banner"),
  uploadBannerController,
);

export default router;
