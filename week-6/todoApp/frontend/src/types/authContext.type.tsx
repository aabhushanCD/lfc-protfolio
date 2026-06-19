import type { IUser } from "./user.type";

export type Status = "idle" | "loading" | "error";

export interface IAuthContextType {
  login: (user: IUser) => Promise<void>;
  signup: (user: IUser) => Promise<void>;
  currentUser: IUser | null;
  status: Status;
  logout: () => void;
}
