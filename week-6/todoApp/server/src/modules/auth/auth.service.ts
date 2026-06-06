import bcrypt from "bcrypt";

import { Auth } from "./model/auth.model.ts";

export const signup = async ({ email, name, password }) => {
  const existingUser = await Auth.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  password = bcrypt.hashSync(password, 10);
  const newUser = new Auth({ email, name, password });
  return await newUser.save();
};

export const login = async ({ email, password }) => {
  console.log(email, password);
  const user = await Auth.findOne({ email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  }
  return;
};
