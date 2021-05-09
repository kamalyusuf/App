import { CustomError } from "./CustomError";
import { IErrorParam } from "@app/water";

export class NotAuthorizedError extends CustomError {
  status = 401;
  public field?: string;

  constructor(public t?: string | IErrorParam) {
    super(
      typeof t === "string"
        ? t
        : typeof t !== "string" && typeof t !== "undefined" && t.message
        ? t.message
        : "Not authorized"
    );

    this.field =
      typeof t !== "string" && typeof t !== "undefined" ? t.field : undefined;

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, field: this.field || undefined }];
  }
}
