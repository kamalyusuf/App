import { CustomError } from "./CustomError";
import { IErrorParam } from "@app/water";

export class BadRequestError extends CustomError {
  status = 400;
  public field?: string;

  constructor(public t: string | IErrorParam) {
    super(typeof t === "string" ? t : t.message);
    this.field = typeof t === "string" ? undefined : t.field;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: this.field }];
  }
}
