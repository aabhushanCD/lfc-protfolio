import { Request, Response } from "express";

import { errorHandler } from "../../middleware/errorHandler.ts";
import { generateToken } from "./auth.utils.ts";
import { login, signup } from "./auth.service.ts";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = generateToken(email);
    const user = await login(req.body);
    console.log(user);
    res.json({ message: "Login successful", data: user, token });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const register = await signup(req.body);
    if (!register) {
      res.status(400).json({ message: "Retry!" });
    }
    res.status(201).json({ message: "Successfully register user", register });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
