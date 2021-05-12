import mongoose, { Document, Schema } from "mongoose";
import { ITeam, Models } from "@app/water";
import autoPopulate from "mongoose-autopopulate";
import paginate from "mongoose-paginate-v2";

export type ITeamDoc = Document & ITeam;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: Models.USER,
    required: true,
    autopopulate: true,
    index: true
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: Models.USER,
      index: true,
      select: false
    }
  ]
});

TeamSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at"
});
TeamSchema.set("toJSON", {
  versionKey: false,
  transform(_: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.members;
  }
});

TeamSchema.plugin(autoPopulate);
TeamSchema.plugin(paginate);

export const Team = mongoose.model(Models.TEAM, TeamSchema, "teams");
