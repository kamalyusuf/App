import { NextFunction, Request, Response } from "express";
import { CustomError } from "../lib/errors/CustomError";
import { logger } from "../lib/logger";
import { IError } from "../lib/types";

export const globalErrorHandler = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.status).send({ errors: error.serializeErrors() });
  }

  // @todo: capture with Sentry
  logger.error(error);
  const message = error.message || "Internal Server Error";
  res.status(error.status || 500).send({ errors: [{ message }] });
};
