import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redis } from "../lib/redis";

const resetPasswordDuration = 900;
const signupDuration = 3600;

export const signupLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: "rate:limit::",
    expiry: signupDuration
  }),
  windowMs: signupDuration,
  max: () => {
    if (process.env.NODE_ENV === "test") {
      return 100;
    }
    return 5;
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

export const resetPasswordLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: "rate:limit::",
    expiry: resetPasswordDuration
  }),
  windowMs: resetPasswordDuration,
  max: () => {
    if (process.env.NODE_ENV === "test") {
      return 100;
    }
    return 5;
  },
  message: {
    message: "Too many requests, please try again after 15 minutes",
    status: 429,
    errors: [
      {
        message: "Too many requests, please try again after 15 minutes"
      }
    ]
  }
});
