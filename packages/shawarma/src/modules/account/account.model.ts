import mongoose, { Schema, Document } from "mongoose";
import { IAccount, Models, IOAuth } from "@app/water";

export type IAccountDoc = Document & IAccount;

const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: Models.USER,
    required: true,
    index: true
  },
  google_id: {
    type: String,
    unique: true
  },
  github_id: {
    type: String,
    unique: true
  },
  tokens: {
    type: [
      {
        _id: false,
        kind: {
          type: String,
          enum: [IOAuth.GOOGLE, IOAuth.GITHUB]
        },
        access_token: String
      }
    ]
    // select: false
  }
});

AccountSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at"
});
AccountSchema.set("toJSON", {
  versionKey: false,
  transform(_: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const Account = mongoose.model<IAccountDoc>(
  Models.ACCOUNT,
  AccountSchema,
  "accounts"
);
