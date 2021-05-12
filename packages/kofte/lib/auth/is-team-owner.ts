import { ITeamMember } from "@app/water";

export const isTeamOwner = (member: ITeamMember | undefined) => {
  if (!member) return false;

  return member.role === "owner";
};
