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
  status: MembershipStatuses;
  role: TeamRoles;
  user: IUser;
  team: ITeam;
  created_at: string;
  updated_at: string;
}

export enum TeamRoles {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member"
}

export enum MembershipStatuses {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  REVOKED = "revoked"
}

export interface ICreateTeam {
  name: string;
}

export enum TeamPermissions {
  CAN_INVITE = "can:invite"
}
