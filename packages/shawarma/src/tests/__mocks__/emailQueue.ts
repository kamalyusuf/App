import { IEmailTokenInput } from "@app/water";
import { Redis } from "ioredis";

export const emailQueue = {
  init: jest.fn().mockImplementation((redis: Redis) => {}),
  queueEmailVerification: jest
    .fn()
    .mockImplementation(async (data: IEmailTokenInput): Promise<void> => {}),
  queueForgotPassword: jest
    .fn()
    .mockImplementation(async (data: IEmailTokenInput): Promise<void> => {})
};
