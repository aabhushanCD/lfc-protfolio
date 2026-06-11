import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../types/jwt.ts";
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new Error("Unauthorized!");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = decode;
    next();
  } catch (error) {
    console.log("error at verify token", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
