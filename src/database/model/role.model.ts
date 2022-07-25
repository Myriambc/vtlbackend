import { Schema, model, Document } from "mongoose";

export const DOCUMENT_NAME = "Role";
export const COLLECTION_NAME = "roles";

export default interface Role extends Document {
  code: string;
  label: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
