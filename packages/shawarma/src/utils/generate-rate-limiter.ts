import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redis } from "../lib";

interface P {
  duration: number;
  max: number;
}

export const generateRateLimiter = ({ duration, max }: P) => {
  return rateLimit({
    store: new RedisStore({
      client: redis,
      prefix: "rate:limit::",
      expiry: duration
    }),
    windowMs: duration,
    max: () => {
      if (process.env.NODE_ENV !== "production") {
        return 1000;
      }
      return max;
    },
    message: {
      message: "Too many requests, please try again later",
      status: 429,
      errors: [
        {
          message: "Too many requests, please try again later"
        }
      ]
    }
  });
};
