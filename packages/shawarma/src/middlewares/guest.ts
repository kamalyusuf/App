import { RequestHandler } from "express";
import { NotAuthorizedError } from "../lib/errors/NotAuthorizedError";

export const guest: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    throw new NotAuthorizedError();
  }
  next();
};
