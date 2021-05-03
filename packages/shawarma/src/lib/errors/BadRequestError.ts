import { CustomError } from "./CustomError";

interface R {
  message: string;
  field: string;
}

export class BadRequestError extends CustomError {
  status = 400;
  public field?: string;

  constructor(public resource: string | R) {
    super(typeof resource === "string" ? resource : resource.message);
    this.field = typeof resource === "string" ? undefined : resource.field;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: this.field }];
  }
}
