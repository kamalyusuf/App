import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redis } from "../lib/redis";

// in seconds
const resetPasswordDuration = 900; // 15 minutes
const signupDuration = 3600; // 1 hour

export const signupLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: "rate:limit::",
    expiry: signupDuration
  }),
  windowMs: signupDuration,
  max: () => {
    if (process.env.NODE_ENV !== "production") {
      return 1000;
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
    if (process.env.NODE_ENV !== "production") {
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
