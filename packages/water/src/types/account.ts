import { IAuthToken } from "./auth";
import { IUser } from "./user";

export interface IAccount {
  id: string;
  user: IUser | string;
  google_id?: string;
  github_id?: string;
  tokens: IAuthToken[];
  created_at: string;
  updated_at: string;
}
