import bcrypt from "bcrypt";

import User from "../model/user.model.ts";
import { verifyPasswordHash } from "../../../shared/utils/verifyPassword.hash.ts";
import { passwordHash } from "../../../shared/utils/password.hash.ts";
import { UpdateUserDto } from "../schema/updateUser.schema.ts";
import { CreateUserDto } from "../schema/createUser.schema.ts";
import { LoginUserDto } from "../schema/loginUser.schema.ts";
import { AppError } from "../../../shared/utils/error.ts";

export const createUser = async ({ name, email, password }: CreateUserDto) => {
  const existed = await User.findOne({ email });
  console.log(existed);
  if (existed) {
    throw new AppError("User Already Existed", 404);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    name,
    password: hashPassword,
  });

  await user.save();
  return user;
};

export const getUser = async ({ email, password }: LoginUserDto) => {
  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });
  
  if (!user) {
    throw new AppError("User Doesn't exist", 401);
  }
  const verify = await verifyPasswordHash(password, user.password);
  if (!verify) {
    throw new AppError("Invalid Credentials", 401);
  }
  return user;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const updateUser = async (id: string, data: UpdateUserDto) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found", 400);
  }

  if (data.newPassword) {
    const verify = await verifyPasswordHash(data.oldPassword!, user.password);

    if (!verify) {
      throw new AppError("Invalid old password", 404);
    }

    user.password = await passwordHash(data.newPassword);
  }

  if (data.name) user.name = data.name;
  if (data.email) user.email = data.email;

  await user.save();

  return user;
};
export const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};
