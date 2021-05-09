import { IAccount } from "./account";

export interface IUser {
  id: string;
  email: string;
  password?: string;
  email_verified: boolean;
  password_reset_token?: string;
  account?: IAccount;
  created_at: string;
  updated_at: string;
}
