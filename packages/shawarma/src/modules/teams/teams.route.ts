import { Router } from "express";
import {
  isAuthenticated,
  isVerified,
  checkTeamName,
  checkValidationResult,
  isValidObjectId
} from "../../middlewares";
import * as TeamsController from "./teams.controller";
import { teamMembersRouter } from "../team-members";

export const router = Router();

router.use("/:id/team-members", isValidObjectId, teamMembersRouter);

router.use(isAuthenticated, isVerified);

router
  .route("/")
  .get(TeamsController.list)
  .post([checkTeamName], checkValidationResult, TeamsController.create);

router.get("/:id", isValidObjectId, TeamsController.listOne);
