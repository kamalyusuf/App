import argon2 from "argon2";
import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../lib/types";

type IUserDoc = Document &
  IUser & {
    comparePassword(password: string): Promise<boolean>;
  };

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  password_reset_token: {
    type: String,
    select: false
  }
});

UserSchema.set("timestamps", true);
UserSchema.set("toJSON", {
  transform(_: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await argon2.hash(this.get("password"));
  this.set("password", hash);
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await argon2.verify(this.get("password"), password);
};

export const User = mongoose.model<IUserDoc>("User", UserSchema, "users");
