import { createContext, useContext, useState, type ReactNode } from "react";
import type { IAuthContextType, Status } from "../types/authContext.type";
import type { IUser } from "../types/user.type";
import { axiosInstance } from "../api/fetch";
import { loginApi, signupApi } from "../api/auth";
import type { LoginSchemaType } from "../schema/LoginSchema";

type AuthProviderProps = {
  children: ReactNode;
};
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const [currentUser, setCurrentUser] = useState<IUser | null>(
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser")!)
      : null,
  );

  const login = async (userData: LoginSchemaType) => {
    try {
      setStatus("loading");
      const data = await loginApi(
        userData as { email: string; password: string },
      );
      localStorage.setItem("currentUser", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

  const signup = async (userData: IUser) => {
    try {
      setStatus("loading");
      await signupApi(userData);
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };
  return (
    <AuthContext.Provider
      value={{ currentUser, login, signup, status, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext) as IAuthContextType;
};
