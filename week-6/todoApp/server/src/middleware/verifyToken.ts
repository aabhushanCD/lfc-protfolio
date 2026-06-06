import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer token"

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
