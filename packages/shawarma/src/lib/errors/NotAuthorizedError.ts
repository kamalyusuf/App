import { CustomError } from "./CustomError";
import { IErrorParam } from "@app/water";

export class NotAuthorizedError extends CustomError {
  status = 401;
  public field?: string;

  constructor(public t?: IErrorParam) {
    super(t && t.message ? t.message : "Not authorized");
    this.field = typeof t !== "undefined" ? t.field : undefined;

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: this.field || undefined }];
  }
}
