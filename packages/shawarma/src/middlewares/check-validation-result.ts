import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "../lib/errors/ValidationError";

export const checkValidationResult: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }

  next();
};
