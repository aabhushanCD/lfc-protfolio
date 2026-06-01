import { NextFunction, Request, Response } from "express";

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
};
