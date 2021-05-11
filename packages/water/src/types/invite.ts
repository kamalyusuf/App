import { ITeam } from "./team";
import { IUser } from "./user";

export interface IInvite {
  id: string;
  invited_by: IUser;
  invite_to_email: string;
  team: ITeam;
  created_at: string;
  updated_at: string;
}

export interface ICreateInvite {
  invite_to_email: string;
  team_id: string;
}
