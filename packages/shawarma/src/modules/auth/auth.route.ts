import {
  checkEmail,
  guest,
  checkValidationResult,
  isAuthenticated,
  isUnauthenticated,
  checkString
} from "./../../middlewares";
import { Router } from "express";
import { generateRateLimiter, generateSpeedLimiter } from "../../utils";
import * as AuthController from "./auth.controller";

const router = Router();

router.post(
  "/signup",
  generateRateLimiter({ max: 5, duration: 3600 }),
  guest,
  [
    checkEmail,
    checkString("password", {
      length: { min: 8, message: "Password must be at least 8 characters" },
      trim: false
    })
  ],
  checkValidationResult,
  AuthController.signup
);

router.post(
  "/signin",
  guest,
  [checkEmail],
  checkValidationResult,
  AuthController.signin
);

router.post("/signout", isAuthenticated, AuthController.signout);

router.get("/me", AuthController.me);

router.post("/verify", AuthController.verify);

router.post(
  "/verify/re",
  generateSpeedLimiter({ duration: 900, delayAfter: 1, delayMs: 2000 }),
  isAuthenticated,
  AuthController.resendVerificationEmail
);

router.use(generateRateLimiter({ max: 5, duration: 900 }), isUnauthenticated);

router.post(
  "/forgot",
  [checkEmail],
  checkValidationResult,
  AuthController.forgotPassword
);

router.post(
  "/reset",
  [
    checkString("password", {
      length: { min: 8, message: "Password must be at least 8 characters" },
      trim: false
    })
  ],
  checkValidationResult,
  AuthController.resetPassword
);

export { router as authRouter };
