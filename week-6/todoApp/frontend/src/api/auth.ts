import axiosInstance from "./fetch";
import type { LoginSchemaType } from "../schema/LoginSchema";

type LoginResponse = {
  token: string;
};
type SignupResponse = {
  token: string;
};

export const loginApi = async (
  data: LoginSchemaType,
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("auth/login", data);
  return response.data;
};

export const signupApi = async (
  data: LoginSchemaType,
): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>("auth/signup", data);
  return response.data;
};
