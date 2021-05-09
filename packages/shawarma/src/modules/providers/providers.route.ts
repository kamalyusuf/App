import { Router } from "express";
import {
  checkValidationResult,
  generateBaseStringValidation,
  isAuthenticated,
  reject
} from "../../middlewares";
import * as ProvidersController from "./providers.controller";

const router = Router();

// @todo: super admin only
router.post(
  "/",
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

router.get("/", ProvidersController.list);

export { router as providersRoutes };
