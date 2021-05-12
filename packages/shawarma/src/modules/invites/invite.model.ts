import mongoose, { Schema, Document } from "mongoose";
import {
  IInvite,
  Models,
  SUPPORTED_PERMISSIONS,
  IInvitationStatuses,
  INVITATION_STATUSES
} from "@app/water";
import uniqueValidator from "mongoose-unique-validator";

type InviteDoc = Document & IInvite;

const InviteSchema = new Schema({
  invited_by: {
    type: Schema.Types.ObjectId,
    ref: Models.USER,
    required: true
  },
  invite_to_email: {
    type: String,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: Models.TEAM,
    required: true
  },
  permissions: {
    type: [String],
    required: true,
    enum: SUPPORTED_PERMISSIONS
  },
  status: {
    type: String,
    default: IInvitationStatuses.PENDING,
    enum: INVITATION_STATUSES
  }
});

InviteSchema.index({ _id: 1, status: 1 });
InviteSchema.index({ invite_to_email: 1, team: 1 }, { unique: true });

InviteSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at"
});
InviteSchema.set("toJSON", {
  versionKey: false,
  transform(_: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

InviteSchema.plugin(uniqueValidator, {
  message: `NO`
});

export const Invite = mongoose.model<InviteDoc>(
  Models.INVITE,
  InviteSchema,
  "invites"
);
