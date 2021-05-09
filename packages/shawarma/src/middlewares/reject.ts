import { RequestHandler } from "express";

export const reject: RequestHandler = () => {
  throw new Error("NOPE");
};
