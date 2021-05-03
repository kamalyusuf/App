import { CustomError } from "./CustomError";
import { IErrorParam } from "@app/water";

export class NotFoundError extends CustomError {
  status = 404;
  public field?: string;

  constructor(public t: string | IErrorParam) {
    super(typeof t === "string" ? t : t.message);
    this.field = typeof t === "string" ? undefined : t.field;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: this.field || undefined }];
  }
}
