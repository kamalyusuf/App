import { RequestHandler } from "express";
import { Invite } from "./invite.model";
import { ICreateInvite } from "@app/water";
import { emailQueue } from "../../lib";

export const create: RequestHandler = async (req, res) => {
  const { invite_to_email, team_id, permissions } = req.body as ICreateInvite;

  const invite = await Invite.create({
    invited_by: req.user!.id,
    invite_to_email,
    team: team_id,
    permissions
  } as any);

  await invite.populate("invited_by").populate("team").execPopulate();

  await emailQueue.queueTeamInvitation({
    invited_by: invite.invited_by,
    team: invite.team,
    invite_to_email: invite.invite_to_email
  });

  res.send(invite);
};
