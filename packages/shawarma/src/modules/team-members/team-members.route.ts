import { Router } from "express";
import * as TeamMembersController from "./team-members.controller";
import { isAuthenticated, isVerified } from "../../middlewares";

export const router = Router({ mergeParams: true });

router.use(isAuthenticated, isVerified);

router.get("/", TeamMembersController.list);
