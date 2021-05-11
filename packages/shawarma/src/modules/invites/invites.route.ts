import { Router } from "express";
import * as InvitesController from "./invites.controller";
import {
  canInvite,
  checkPermissions,
  isAuthenticated,
  isVerified,
  checkValidationResult
} from "../../middlewares";
import { body, check } from "express-validator";
import { SUPPORTED_PERMISSIONS } from "@app/water";

export const router = Router();

router.use(isAuthenticated, isVerified);

router
  .route("/")
  .get(InvitesController.list)
  .post(
    [
      body("team_id")
        .exists()
        .withMessage("Team id is required")
        .isMongoId()
        .withMessage("Invalid id"),
      checkPermissions,
      check("permissions.*")
        .isString()
        .withMessage("Rule must be a string")
        .isIn(SUPPORTED_PERMISSIONS)
        .withMessage("Invalid rule"),
      body("invite_to_email")
        .exists()
        .withMessage("Invitee's email is required")
        .isEmail()
        .withMessage("Invalid email")
    ],
    checkValidationResult,
    canInvite,
    InvitesController.create
  );
