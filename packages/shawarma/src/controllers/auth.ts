import { randomBytes } from "crypto";
import { RequestHandler } from "express";
import createError from "http-errors";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { emailQueue } from "../lib/emailQueue";
import { BadRequestError } from "../lib/errors/BadRequestError";
import { NotFoundError } from "../lib/errors/NotFoundError";
import { redis } from "../lib/redis";
import { IUser, RPrefix } from "../lib/types";
import { User } from "../models/User";
import { SESSION_NAME } from "../utils/constants";

export const signup: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (await User.exists({ email })) {
    throw new BadRequestError("Email already in use");
  }

  const user = new User({ email, password });
  await user.save();

  const token = randomBytes(32).toString("hex");

  const key = `${RPrefix.EMAIL_VERIFICATION}${token}`;
  await redis.set(key, user.id);

  await emailQueue.queueEmailVerification({ email: user.email, token });

  req.logIn(user, (error) => {
    if (error) {
      return next(error);
    }
    res.status(201).send(user);
  });
};

export const signin: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "local",
    (error: Error, user: IUser, info: IVerifyOptions) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return next(createError(info.status, info.message));
      }

      req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        res.send(user);
      });
    }
  )(req, res, next);
};

export const signout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.clearCookie(SESSION_NAME);
    res.send();
  });
};

export const me: RequestHandler = async (req, res) => {
  if (req.isUnauthenticated()) {
    return res.send(null);
  }

  const user = await User.findById(req.user!.id);
  res.send(user);
};

export const verify: RequestHandler = async (req, res) => {
  const token = req.query.token as string;
  const email = req.query.email as string;
  if (!token || !email) {
    throw new BadRequestError("Invalid token");
  }

  const key = `${RPrefix.EMAIL_VERIFICATION}${token}`;
  const userId = await redis.get(key);
  if (!userId) {
    throw new BadRequestError("Invalid token");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  if (user.email !== email) {
    throw new BadRequestError("Invalid token");
  }

  user.set({ email_verified: true });
  await Promise.all([user.save(), redis.del(key)]);

  res.send();
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select("+password_reset_token");
  if (!user) {
    throw new NotFoundError("Account with that email does not exist");
  }

  if (user.password_reset_token) {
    await redis.del(`${RPrefix.FORGOT_PASSWORD}${user.password_reset_token}`);
  }

  const token = randomBytes(32).toString("hex");
  const key = `${RPrefix.FORGOT_PASSWORD}${token}`;
  user.set({ password_reset_token: token });

  await Promise.all([
    user.save(),
    redis.set(key, user.id, "ex", 1000 * 60 * 60 * 24)
  ]);

  await emailQueue.queueForgotPassword({ email: user.email, token });

  res.send({
    message: `An email has been sent to ${user.email} with further instructions`
  });
};

export const resetPassword: RequestHandler = async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;

  const key = `${RPrefix.FORGOT_PASSWORD}${token}`;
  const userId = await redis.get(key);
  if (!userId) {
    throw new BadRequestError("Invalid token");
  }

  const user = await User.findById(userId).select("+password_reset_token");
  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  if (!user.password_reset_token) {
    throw new BadRequestError("Invalid token");
  }

  user.set({ password, password_reset_token: undefined });

  await Promise.all([user.save(), redis.del(key)]);

  res.send({ message: "Password reset successful" });
};
