import { Request, Response, NextFunction } from "express";

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
