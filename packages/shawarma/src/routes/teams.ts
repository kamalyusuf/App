import { Router } from "express";
import { TeamsController } from "../controllers";
import {
  checkTeamName,
  isAuthenticated,
  isVerified,
  checkValidationResult,
  isValidObjectId
} from "../middlewares";

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
