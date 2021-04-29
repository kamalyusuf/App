import { CustomError } from "./CustomError";

export class NotAuthorizedError extends CustomError {
  status = 401;

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
