import jwt from "jsonwebtoken";

export const generateToken = (userId: string, email: string, role: string) => {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
