import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map((err) => ({
            field: err.path.join(".") || "root",
            message: err.message,
            code: err.code,
          })),
        });
      }

      return res.status(500).json({
        message: "Internal server error!",
      });
    }
  };
};
