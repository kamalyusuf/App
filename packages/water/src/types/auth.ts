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

export interface IAuthToken {
  kind: IOAuth.GOOGLE | IOAuth.GITHUB;
  access_token: string;
}

export enum IOAuth {
  GOOGLE = "google",
  GITHUB = "github"
}
