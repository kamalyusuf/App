import {
  ICreateInvite,
  TeamPermissions,
  SUPPORTED_PERMISSIONS
} from "@app/water";
import { RequestHandler } from "express";
import { NotAuthorizedError, NotFoundError, BadRequestError } from "../lib";
import { TeamMember } from "../modules/team-members";
import { Team } from "../modules/teams";

export const canInvite: RequestHandler = async (req, _, next) => {
  const { team_id, invite_to_email } = req.body as Pick<
    ICreateInvite,
    "team_id" | "invite_to_email"
  >;

  if (invite_to_email === req.user!.email) {
    throw new BadRequestError("You cannot invite yourself");
  }

  const team = await Team.findById(team_id);
  if (!team) {
    throw new NotFoundError("Team does not exist");
  }

  const isTeamOwner = team.owner.id.toString() === req.user!.id;

  if (isTeamOwner) {
    return next();
  }

  const member = await TeamMember.findOne({
    team: team_id,
    user: req.user!.id
  } as any).lean();
  if (!member) {
    throw new NotAuthorizedError();
  }

  const hasPermission = member.permissions.includes(TeamPermissions.CAN_INVITE);

  if (!hasPermission) {
    throw new NotAuthorizedError();
  }

  next();
};
