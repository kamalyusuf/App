import { RequestHandler } from "express";
import { NotAuthorizedError } from "../lib";

export const isVerified: RequestHandler = (req, res, next) => {
  if (!req.user?.email_verified) {
    throw new NotAuthorizedError("Email not verified");
  }

  next();
};
