import { RequestHandler } from "express";
import { TeamMember } from "./team-member.model";
import { NotFoundError } from "../../lib";

export const list: RequestHandler = async (req, res) => {
  const members = await TeamMember.find({
    team: req.params.id as any
  }).populate("user");

  if (!members.length) {
    throw new NotFoundError("Team does not exist");
  }

  res.send(members);
};
