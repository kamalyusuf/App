import mongoose, { Document, Schema } from "mongoose";
import { MembershipStatuses, TeamRoles, ITeamMember, Models } from "@app/water";

export type ITeamMemberDoc = Document & ITeamMember;

const TeamMemberSchema = new Schema({
  status: {
    type: String,
    enum: [
      MembershipStatuses.PENDING,
      MembershipStatuses.ACCEPTED,
      MembershipStatuses.REJECTED,
      MembershipStatuses.REVOKED
    ],
    default: MembershipStatuses.PENDING
  },
  role: {
    type: String,
    enum: [TeamRoles.OWNER, TeamRoles.ADMIN, TeamRoles.MEMBER],
    default: TeamRoles.MEMBER
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: Models.USER,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: Models.TEAM,
    required: true
  }
});

TeamMemberSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at"
});
TeamMemberSchema.set("toJSON", {
  versionKey: false,
  transform(_: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const TeamMember = mongoose.model<ITeamMemberDoc>(
  Models.TEAM_MEMBER,
  TeamMemberSchema,
  "team_members"
);
