import {
  IAcceptInvite,
  ICreateInvite,
  IInvitationStatuses,
  IInviteActions
} from "@app/water";
import { RequestHandler, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import {
  emailQueue,
  InternalServerError,
  NotAuthorizedError,
  NotFoundError,
  BadRequestError,
  emitter
} from "../../lib";
import { TeamMember } from "../team-members";
import { Team } from "../teams";
import { User } from "../users";
import { Invite, InviteDoc } from "./invite.model";

export const create: RequestHandler = async (req, res) => {
  const { invite_to_email, team_id, permissions } = req.body as ICreateInvite;

  if (await Invite.exists({ invite_to_email, team: team_id as any })) {
    throw new BadRequestError(`Invite to ${invite_to_email} already exists`);
  }

  const invite = await Invite.create({
    invited_by: req.user!.id,
    invite_to_email,
    team: team_id,
    permissions
  } as any);

  await Promise.all([
    invite.populate("invited_by").populate("team").execPopulate(),
    emailQueue.queueTeamInvitation({
      invited_by: invite.invited_by,
      team: invite.team,
      invite_to_email: invite.invite_to_email
    })
  ]);

  emitter.emit("invite:new", { invite });

  res.status(201).send(invite);
};

export const list: RequestHandler = async (req, res) => {
  const invites = await Invite.find({ invite_to_email: req.user!.email })
    .populate("invited_by")
    .populate("team")
    .sort({ created_at: -1 });

  res.send(invites);
};

const accept = async (req: Request, res: Response, invite: InviteDoc) => {
  const user = await User.findOne({ email: invite.invite_to_email });
  if (!user) {
    throw new Error("User does not exist");
  }

  if (user.email !== req.user!.email) {
    throw new NotAuthorizedError();
  }

  if (await Team.exists({ _id: invite.team, members: user.id })) {
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

  emitter.emit("invite:accept", { invite });

  res.send(invite);
};

const reject = async (req: Request, res: Response, invite: InviteDoc) => {
  const user = await User.findOne({ email: invite.invite_to_email });
  if (!user) {
    throw new Error("User does not exist");
  }

  if (user.email !== req.user!.email) {
    throw new NotAuthorizedError();
  }

  invite.set({ status: IInvitationStatuses.REJECTED });
  await invite.save();

  await invite.populate("invited_by").populate("team").execPopulate();

  res.send(invite);
};

const revoke = (res: Response, invite: InviteDoc) => {
  res.send("Finna revoke");
};

export const actions: RequestHandler = async (req, res) => {
  const action = req.query.action as IInviteActions;
  const { invite_id } = req.body as IAcceptInvite;

  const invite = await Invite.findOne({
    _id: invite_id,
    status: IInvitationStatuses.PENDING
  });
  if (!invite) {
    throw new NotFoundError("Invite does not exist");
  }

  switch (action) {
    case IInviteActions.ACCEPT:
      return accept(req, res, invite);
    case IInviteActions.REJECT:
      return reject(req, res, invite);
    case IInviteActions.REVOKE:
      return revoke(res, invite);
  }
};
