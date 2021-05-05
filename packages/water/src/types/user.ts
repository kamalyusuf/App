export interface IUser {
  id: string;
  email: string;
  password?: string;
  email_verified: boolean;
  password_reset_token?: string;
  created_at: string;
  updated_at: string;
}
