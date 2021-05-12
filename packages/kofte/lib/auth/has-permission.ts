import { TeamPermissions, ITeamMember } from "@app/water";

const permissions = ["can:invite"] as TeamPermissions[];

export const hasPermission = (member: ITeamMember | undefined) => {
  if (!member) return false;

  return permissions.some((permission) =>
    member.permissions.includes(permission)
  );
};
