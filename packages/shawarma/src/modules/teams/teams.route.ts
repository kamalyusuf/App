import { Router } from "express";
import {
  isAuthenticated,
  isVerified,
  checkValidationResult,
  isValidObjectId,
  checkString
} from "../../middlewares";
import * as TeamsController from "./teams.controller";
import { teamMembersRouter } from "../team-members";

export const router = Router();

router.use("/:id/team-members", isValidObjectId, teamMembersRouter);

router.use(isAuthenticated, isVerified);

router
  .route("/")
  .get(TeamsController.list)
  .post(
    [
      checkString("name", {
        length: { min: 4, message: "Team name must be at least 5 characters" },
        field_name: "Team name"
      })
    ],
    checkValidationResult,
    TeamsController.create
  );

router.get("/:id", isValidObjectId, TeamsController.listOne);
