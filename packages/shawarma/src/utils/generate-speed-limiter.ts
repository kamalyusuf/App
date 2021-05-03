import slowDown from "express-slow-down";
import RedisStore from "rate-limit-redis";
import { redis } from "../lib";

interface P {
  duration: number;
  delayAfter: number;
  delayMs: number;
}

export const generateSpeedLimiter = ({ duration, delayAfter, delayMs }: P) => {
  return slowDown({
    store: new RedisStore({
      client: redis,
      prefix: "speed:limit::",
      expiry: duration
    }),
    windowMs: duration,
    delayAfter,
    delayMs
  });
};
