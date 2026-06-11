import { NextFunction, Request, Response } from "express";

import { getUser } from "../services/user.services.ts";
import { generateToken } from "../../../shared/utils/generateToken.ts";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUser(req.body);
    const token = generateToken(user._id.toString(), user.email);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Successfully Login",
      user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
