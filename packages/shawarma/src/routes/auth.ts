import { Router } from "express";
import * as AuthController from "../controllers/auth";
import { generateRateLimiter, generateSpeedLimiter } from "../utils";
import {
  checkEmail,
  checkPassword,
  guest,
  isAuthenticated,
  checkValidationResult,
  isUnauthenticated
} from "../middlewares";

const router = Router();

router.post(
  "/signup",
  generateRateLimiter({ max: 5, duration: 3600 }),
  guest,
  [checkEmail, checkPassword],
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
  [checkPassword],
  checkValidationResult,
  AuthController.resetPassword
);

export { router as authRoutes };
