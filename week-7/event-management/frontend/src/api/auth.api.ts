import type { LoginUserType } from "../schema/login.schema";
import type { SignupUserType } from "../schema/signup.schema";
import { axiosInstance } from "./client";

export const loginApi = async (data: LoginUserType) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data.user;
};

export const signupApi = async (data: SignupUserType) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data.data;
};

export const logoutApi = async () => {
  return await axiosInstance.post("/auth/logout");
};
