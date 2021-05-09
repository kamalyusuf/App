import mongoose, { Schema, Document } from "mongoose";
import { IProvider, Models } from "@app/water";

type IProviderDoc = Document & IProvider;

const ProviderSchema = new Schema({
  label: {
    type: String,
    required: true,
    lowercase: true
  },
  value: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  link: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
});

ProviderSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at"
});
ProviderSchema.set("toJSON", {
  versionKey: false,
  transform(_: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const Provider = mongoose.model<IProviderDoc>(
  Models.PROVIDER,
  ProviderSchema,
  "providers"
);
