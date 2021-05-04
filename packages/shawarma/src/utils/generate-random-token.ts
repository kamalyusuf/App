import { randomBytes } from "crypto";

export const generateRandomToken = (bytes: number) => {
  return randomBytes(bytes).toString("hex");
};
