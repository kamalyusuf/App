import { Router } from "express";
import {
  isAuthenticated,
  isVerified,
  checkTeamName,
  checkValidationResult,
  isValidObjectId
} from "../../middlewares";
import * as TeamsController from "./teams.controller";

const router = Router();

router.use(isAuthenticated, isVerified);

router.post(
  "/",
  [checkTeamName],
  checkValidationResult,
  TeamsController.create
);

router.get("/:id", isValidObjectId, TeamsController.listOne);

router.get("/", TeamsController.list);

export { router as teamsRoutes };
