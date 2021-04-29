import { ValidationError as TValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class ValidationError extends CustomError {
  status = 422;

  constructor(public errors: TValidationError[]) {
    super("");

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param
    }));
  }
}
