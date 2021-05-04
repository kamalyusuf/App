export interface IEmailTokenInput {
  email: string;
  token: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export type IResetPassword = Pick<ICredentials, "password"> &
  Pick<IEmailTokenInput, "token">;
