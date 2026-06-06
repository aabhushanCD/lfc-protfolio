import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: error,
        });
      }

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
};
