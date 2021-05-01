export enum Jobs {
  EMAIL_VERIFICATION = "email:verification",
  FORGOT_PASSWORD = "forgot:password"
}

export interface IEmailTokenInput {
  email: string;
  token: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IResponseError {
  message: string;
  field?: string;
}
