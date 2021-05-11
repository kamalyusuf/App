import { IUser } from "./user";

export interface ITeam {
  id: string;
  name: string;
  owner: string | IUser;
  created_at: string;
  updated_at: string;
}

export interface ITeamMember {
  id: string;
  role: TeamRoles;
  user: IUser;
  team: ITeam;
  permissions: TeamPermissions[];
  created_at: string;
  updated_at: string;
}

export enum TeamRoles {
  OWNER = "owner",
  MEMBER = "member"
}

export const SUPPORTED_TEAM_ROLES = [TeamRoles.OWNER, TeamRoles.MEMBER];

export interface ICreateTeam {
  name: string;
}

export enum TeamPermissions {
  CAN_INVITE = "can:invite"
}
