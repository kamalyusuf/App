import { Router } from "express";
import * as AuthController from "../controllers/auth";
import { checkValidationResult } from "../middlewares/checkValidationResult";
import { guest } from "../middlewares/guest";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { resetPasswordLimiter, signupLimiter } from "../middlewares/limiters";
import { checkEmail, checkPassword } from "../middlewares/validation";

const router = Router();

router.post(
  "/signup",
  signupLimiter,
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

router.get("/verify", AuthController.verify);

router.use(resetPasswordLimiter);

router.post(
  "/forgot",
  [checkEmail],
  checkValidationResult,
  AuthController.forgotPassword
);

router.post(
  "/reset/:token",
  [checkPassword],
  checkValidationResult,
  AuthController.resetPassword
);

export { router as authRoutes };
