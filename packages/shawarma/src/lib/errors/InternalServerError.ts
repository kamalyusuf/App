import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
  status = 500;

  constructor() {
    super("Internal Server Error");

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: "Internal Server Error" }];
  }
}
