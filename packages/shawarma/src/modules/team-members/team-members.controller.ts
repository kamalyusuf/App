import { RequestHandler } from "express";
import { TeamMember } from "./team-member.model";
import { Team } from "../teams";
import { NotFoundError } from "../../lib";

export const list: RequestHandler = async (req, res) => {
  if (!(await Team.exists({ _id: req.params.id }))) {
    throw new NotFoundError("Team does not exist");
  }

  const members = await TeamMember.find({
    team: req.params.id as any
  }).populate("user");

  res.send(members);
};
