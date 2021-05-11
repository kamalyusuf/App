import { ITeam, TeamPermissions } from "./team";
import { IUser } from "./user";

export interface IInvite {
  id: string;
  invited_by: IUser;
  invite_to_email: string;
  team: ITeam;
  permissions: TeamPermissions[];
  created_at: string;
  updated_at: string;
}

export interface ICreateInvite {
  invite_to_email: string;
  team_id: string;
  permissions: TeamPermissions[];
}

export const SUPPORTED_PERMISSIONS: TeamPermissions[] = [
  TeamPermissions.CAN_INVITE
];

export interface ISendInvitationEmail {
  invited_by: IUser;
  team: ITeam;
  invite_to_email: string;
}

export enum IInvitationStatuses {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  REVOKED = "revoked"
}

export const INVITATION_STATUSES = [
  IInvitationStatuses.PENDING,
  IInvitationStatuses.ACCEPTED,
  IInvitationStatuses.REJECTED,
  IInvitationStatuses.REVOKED
];
