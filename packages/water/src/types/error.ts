export interface IErrorParam {
  message: string;
  field?: string;
}

export interface IError extends Error {
  status?: number;
}
