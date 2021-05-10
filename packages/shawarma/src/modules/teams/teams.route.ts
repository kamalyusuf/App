import { Router } from "express";
import {
  isAuthenticated,
  isVerified,
  checkTeamName,
  checkValidationResult,
  isValidObjectId
} from "../../middlewares";
import * as TeamsController from "./teams.controller";
import { teamMembersRoutes } from "../team-members";

const router = Router();

router.use(isAuthenticated, isVerified);

router.post(
  "/",
  [checkTeamName],
  checkValidationResult,
  TeamsController.create
);

router.use("/:id/team-members", isValidObjectId, teamMembersRoutes);

router.get("/:id", isValidObjectId, TeamsController.listOne);

router.get("/", TeamsController.list);

export { router as teamsRoutes };
