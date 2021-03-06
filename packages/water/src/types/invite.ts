import { ITeam, TeamPermissions } from "./team";
import { IUser } from "./user";

export interface IInvite {
  id: string;
  invited_by: IUser;
  invite_to_email: string;
  team: ITeam;
  status: IInvitationStatuses;
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

export interface IAcceptInvite {
  invite_id: string;
}

export enum IInviteActions {
  ACCEPT = "accept",
  REJECT = "reject",
  REVOKE = "revoke"
}

export const SUPPORTED_ACTIONS = [
  IInviteActions.ACCEPT,
  IInviteActions.REJECT,
  IInviteActions.REVOKE
];
