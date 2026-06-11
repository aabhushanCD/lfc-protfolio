import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => {  
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
        message: "Internal Server Error",
      });
    }
  };
};
