import { RequestHandler } from "express";
import { NotAuthorizedError } from "../lib/errors/NotAuthorizedError";

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isUnauthenticated()) {
    throw new NotAuthorizedError();
  }
  next();
};
