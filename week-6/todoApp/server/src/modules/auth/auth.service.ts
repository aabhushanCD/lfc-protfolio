import bcrypt from "bcrypt";

import { Auth } from "./model/auth.model.ts";
import { LoginAuthInput } from "./schema/loginAuthSchema.ts";
import { CreateAuthInput } from "./schema/auth.schema.ts";

export const signup = async ({ email, name, password }: CreateAuthInput) => {
  const existingUser = await Auth.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  password = bcrypt.hashSync(password, 10);
  const newUser = new Auth({ email, name, password });
  return await newUser.save();
};

export const login = async ({ email, password }: LoginAuthInput) => {
  const user = await Auth.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};
