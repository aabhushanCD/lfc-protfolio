import jwt from "jsonwebtoken";
import { CreateAuthInput } from "../../modules/auth/schema/auth.schema.ts";

export const generateToken = (payload: Partial<CreateAuthInput>) => {
  if (!payload) {
    return;
  }
  return jwt.sign({ payload }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "15d",
  });
};
