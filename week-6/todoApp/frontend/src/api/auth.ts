import axiosInstance from "./fetch";
import type { LoginSchemaType } from "../schema/LoginSchema";

type LoginResponse = {
  token: string;
};

export async function loginApi(data: LoginSchemaType): Promise<LoginResponse> {
  const response = await axiosInstance.post<LoginResponse>("auth/login", data);
  return response.data;
}
