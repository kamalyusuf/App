import mongoose, { Document, Schema } from "mongoose";
import {
  TeamRoles,
  ITeamMember,
  Models,
  SUPPORTED_PERMISSIONS,
  SUPPORTED_TEAM_ROLES
} from "@app/water";

export type ITeamMemberDoc = Document & ITeamMember;

const TeamMemberSchema = new Schema({
  role: {
    type: String,
    enum: SUPPORTED_TEAM_ROLES,
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
    required: true,
    select: false
  },
  permissions: {
    type: [String],
    required: true,
    enum: SUPPORTED_PERMISSIONS
  }
});

TeamMemberSchema.index({ user: 1, team: 1 });
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
