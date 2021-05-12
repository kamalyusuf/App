// @ts-nocheck
import { Router } from "express";
import * as InvitesController from "./invites.controller";
import {
  canInvite,
  checkPermissions,
  isAuthenticated,
  isVerified,
  checkValidationResult
} from "../../middlewares";
import { body, check, query } from "express-validator";
import { SUPPORTED_PERMISSIONS, SUPPORTED_ACTIONS } from "@app/water";

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

router.post(
  "/actions",
  [
    query("action")
      .exists()
      .withMessage("Action must be specified")
      .isIn(SUPPORTED_ACTIONS)
      .withMessage("Invalid action"),
    body("invite_id")
      .exists()
      .withMessage("Missing invitation id")
      .isMongoId()
      .withMessage("Invalid id")
  ],
  checkValidationResult,
  InvitesController.actions
);
