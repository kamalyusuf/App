import { RequestHandler } from "express";
import { Team } from "../models/Team";
import { TeamMember } from "../models/TeamMember";
import { ICreateTeam, MembershipStatuses, TeamRoles } from "@app/water";
import mongoose, { ClientSession, PaginateOptions } from "mongoose";
import { BadRequestError, InternalServerError, NotFoundError } from "../lib";

export const create: RequestHandler = async (req, res) => {
  const user = req.user!;
  const { name }: ICreateTeam = req.body;

  if (await Team.exists({ name: name.toLowerCase(), owner: user.id })) {
    throw new BadRequestError("Team name must be unique");
  }

  const team = new Team({ name, owner: user.id });
  team.members.push(user.id);
  const member = new TeamMember({
    user: user.id,
    status: MembershipStatuses.ACCEPTED,
    role: TeamRoles.OWNER,
    team: team.id
  });

  await (mongoose as any).connection.transaction(
    async (session: ClientSession) => {
      try {
        await team.save({ session });
        await member.save({ session });
      } catch (error) {
        await session.abortTransaction();
        throw new InternalServerError();
      }
    }
  );

  res.status(201).send(team);
};

export const list: RequestHandler = async (req, res) => {
  const user = req.user!;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const options: PaginateOptions = {
    page: page || 1,
    limit: limit || 10,
    sort: {
      created_at: -1
    }
  };

  const teams = await Team.paginate({ members: user.id }, options);

  res.send(teams);
};

export const listOne: RequestHandler = async (req, res) => {
  const user = req.user!;

  const team = await Team.findOne({ _id: req.params.id, members: user.id });
  if (!team) {
    throw new NotFoundError("Team does not exist");
  }

  res.send(team);
};
