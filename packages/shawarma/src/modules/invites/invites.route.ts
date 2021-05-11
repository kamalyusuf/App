import { Router } from "express";
import * as InvitesController from "./invites.controller";
import { isAuthenticated, isVerified } from "../../middlewares";

const router = Router();

router.use(isAuthenticated, isVerified);

router.post("/", InvitesController.create);

export { router as invitesRoutes };
