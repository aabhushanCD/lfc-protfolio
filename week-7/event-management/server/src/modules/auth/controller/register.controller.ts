import { NextFunction, Request, Response } from "express";
import { createUser } from "../services/user.services.ts";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ message: "Successfully register", user });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
