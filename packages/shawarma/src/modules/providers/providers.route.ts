import { Router } from "express";
import {
  checkString,
  checkValidationResult,
  isAuthenticated,
  reject
} from "../../middlewares";
import * as ProvidersController from "./providers.controller";

const router = Router();

router
  .route("/")
  .get(ProvidersController.list)
  .post(
    reject,
    isAuthenticated,
    [
      checkString("label", {}),
      checkString("value", {}),
      checkString("link", { escape: false })
    ],
    checkValidationResult,
    ProvidersController.create
  );

export { router as providersRouter };
