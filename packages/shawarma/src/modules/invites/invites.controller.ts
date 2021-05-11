import { RequestHandler } from "express";
import { Invite } from "./invite.model";
import { ICreateInvite } from "@app/water";

export const create: RequestHandler = async (req, res) => {
  const { invite_to_email, team_id } = req.body as ICreateInvite;

  const invite = await Invite.create({
    invited_by: req.user!.id,
    invite_to_email,
    team: team_id
  } as any);

  res.send(invite);
};
