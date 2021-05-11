import { Router } from "express";
import {
  checkValidationResult,
  generateBaseStringValidation,
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
      generateBaseStringValidation("label"),
      generateBaseStringValidation("value"),
      generateBaseStringValidation("link", { escape: false })
    ],
    checkValidationResult,
    ProvidersController.create
  );

export { router as providersRouter };
