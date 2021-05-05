import { RequestHandler } from "express";
import { Types } from "mongoose";
import { BadRequestError } from "../lib";

const { ObjectId } = Types;

export const isValidObjectId: RequestHandler = (req, _, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    throw new BadRequestError("Invalid ObjectId");
  }
  next();
};
