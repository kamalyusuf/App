import { RequestHandler } from "express";
import { Invite } from "./invite.model";
import { ICreateInvite, IAcceptInvite, IInvitationStatuses } from "@app/water";
import {
  emailQueue,
  InternalServerError,
  NotAuthorizedError,
  NotFoundError
} from "../../lib";
import { TeamMember } from "../team-members";
import { Team } from "../teams";
import { User } from "../users";
import mongoose, { ClientSession } from "mongoose";

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

  res.status(201).send(invite);
};

export const list: RequestHandler = async (req, res) => {
  const invites = await Invite.find({ invite_to_email: req.user!.email })
    .populate("invited_by")
    .populate("team")
    .sort({ created_at: -1 });

  res.send(invites);
};

export const accept: RequestHandler = async (req, res) => {
  const { invite_id } = req.body as IAcceptInvite;

  const invite = await Invite.findOne({
    _id: invite_id,
    status: IInvitationStatuses.PENDING
  });
  if (!invite) {
    throw new NotFoundError("Invite does not exist");
  }

  const user = await User.findOne({ email: invite.invite_to_email });
  if (!user) {
    throw new Error("User does not exist");
  }

  if (invite.invite_to_email !== user.email) {
    throw new NotAuthorizedError();
  }

  if (await Team.exists({ members: user.id })) {
    throw new NotAuthorizedError();
  }

  invite.set({ status: IInvitationStatuses.ACCEPTED });
  const member = new TeamMember({
    user: user.id,
    team: invite.team,
    permissions: invite.permissions
  });

  await (mongoose as any).connection.transaction(
    async (session: ClientSession) => {
      try {
        await invite.save({ session });
        await member.save({ session });
        await Team.updateOne(
          { _id: invite.team },
          {
            $addToSet: {
              members: user.id
            }
          },
          { session }
        );
      } catch (e) {
        await session.abortTransaction();
        throw new InternalServerError();
      }
    }
  );

  await invite.populate("invited_by").populate("team").execPopulate();

  res.send(invite);
};
