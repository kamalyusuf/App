export interface IError extends Error {
  status?: number;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  email_verified: boolean;
  password_reset_token?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum RPrefix {
  EMAIL_VERIFICATION = "email:verification::",
  FORGOT_PASSWORD = "forgot:password::"
}
