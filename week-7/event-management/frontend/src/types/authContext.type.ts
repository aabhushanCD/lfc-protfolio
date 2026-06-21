import type { LoginUserType } from "../schema/login.schema";
import type { SignupUserType } from "../schema/signup.schema";
import type { IUser } from "./user.type";

export type Status = "idle" | "loading" | "error";

export interface IAuthContextType {
  login: (user: LoginUserType) => Promise<void>;
  signup: (user: SignupUserType) => Promise<void>;
  currentUser: IUser | null;
  status: Status;
  logout: () => void;
}
