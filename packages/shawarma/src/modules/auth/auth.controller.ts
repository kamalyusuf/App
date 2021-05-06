import {
  ICredentials,
  RPrefix,
  IUser,
  IEmailTokenInput,
  IResetPassword
} from "@app/water";
import { RequestHandler } from "express";
import { User } from "../users";
import {
  BadRequestError,
  emailQueue,
  NotAuthorizedError,
  NotFoundError,
  redis
} from "../../lib";
import { generateRandomToken } from "../../utils";
import passport from "passport";
import { IVerifyOptions } from "passport-local";

export const signup: RequestHandler = async (req, res, next) => {
  const { email, password }: ICredentials = req.body;

  if (await User.exists({ email })) {
    throw new BadRequestError({
      message: "Email already in use",
      field: "email"
    });
  }

  const user = new User({ email, password });
  await user.save();

  const token = generateRandomToken(8);

  const key = `${RPrefix.EMAIL_VERIFICATION}${token}`;

  await Promise.all([
    redis.set(key, user.id, "ex", 1000 * 60 * 60 * 24 * 7),
    emailQueue.queueEmailVerification({ email: user.email, token })
  ]);

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
        switch (info.status) {
          case 404:
            throw new NotFoundError({
              message: info.message,
              field: info.field
            });
          case 401:
            throw new NotAuthorizedError({
              message: info.message,
              field: info.field
            });
        }
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

    res.clearCookie(process.env.SESSION_NAME);
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
  const { token, email }: IEmailTokenInput = req.body;
  if (!token || !email) {
    throw new BadRequestError("Invalid email or token");
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

  if (user.email_verified) {
    throw new BadRequestError("Email address has already been verified");
  }

  user.set({ email_verified: true });
  await Promise.all([user.save(), redis.del(key)]);

  res.send(user);
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email }: Pick<IEmailTokenInput, "email"> = req.body;

  const user = await User.findOne({ email }).select("+password_reset_token");
  // if (!user) {
  //   return res.send({ message });
  //   // throw new NotFoundError("Account with that email does not exist");

  if (user) {
    if (user.password_reset_token) {
      await redis.del(`${RPrefix.FORGOT_PASSWORD}${user.password_reset_token}`);
    }

    const token = generateRandomToken(32);
    const key = `${RPrefix.FORGOT_PASSWORD}${token}`;
    user.set({ password_reset_token: token });

    await Promise.all([
      user.save(),
      redis.set(key, user.id, "ex", 1000 * 60 * 60 * 24),
      emailQueue.queueForgotPassword({ email: user.email, token })
    ]);
  }

  res.send({
    message:
      "If we find a match, you'll get an email with a link to reset your password shortly"
  });
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { password, token }: IResetPassword = req.body;

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

export const resendVerificationEmail: RequestHandler = async (req, res) => {
  const token = generateRandomToken(8);

  const key = `${RPrefix.EMAIL_VERIFICATION}${token}`;

  await Promise.all([
    redis.set(key, req.user!.id, "ex", 1000 * 60 * 60 * 24 * 7),
    emailQueue.queueEmailVerification({ email: req.user!.email, token })
  ]);

  res.send({
    message: `Verification link has been sent to ${req.user!.email}`
  });
};
