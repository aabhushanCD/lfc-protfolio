import { Request, Response, NextFunction } from "express";

import {
  createEvent,
  getPublishedEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  publishEvent,
  uploadBanner,
} from "../services/event.services.ts";

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const event = await createEvent(req.body, req.user!.userId);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await getPublishedEvents();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const event = await getEventById(req.params.id);

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const event = await updateEvent(req.params.id, req.body, req.user!.userId);

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await deleteEvent(req.params.id, req.user!.userId);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const publishEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const event = await publishEvent(req.params.id, req.user!.userId);

    res.status(200).json({
      success: true,
      message: "Event published successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadBannerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Banner file is required",
      });
    }

    const event = await uploadBanner(
      req.params.id,
      req.file.path,
      req.user!.userId,
    );

    res.status(200).json({
      success: true,
      message: "Banner uploaded successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
