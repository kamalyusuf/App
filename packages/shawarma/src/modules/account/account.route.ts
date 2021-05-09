import { Router } from "express";
import passport from "passport";
import { AuthenticateOptionsGoogle } from "passport-google-oauth20";
import { isAuthenticated } from "../../middlewares";
import { IUser } from "@app/water";
import { IVerifyOptions } from "passport-local";
import createError from "http-errors";
import * as AccountController from "./account.controller";

const router = Router();

router.use(isAuthenticated);

router.get("/link/google", (req, res, next) => {
  const options: AuthenticateOptionsGoogle = {
    scope: ["profile", "email"],
    prompt: "select_account"
  };

  passport.authenticate("google", options)(req, res, next);
});

router.get("/link/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    (error: Error, user: IUser, info: IVerifyOptions) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return next(createError(info.status, info.message));
      }

      res.redirect(`${process.env.KOFTE_URL}/account`);
    }
  )(req, res, next);
});

router.patch("/unlink", AccountController.unlinkProvider);

router.get("/", AccountController.retrieve);

export { router as accountRoutes };
