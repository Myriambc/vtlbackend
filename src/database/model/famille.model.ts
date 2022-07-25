import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "Famille";
export const COLLECTION_NAME = "familles";

export default interface Famille extends Document {
  label: string;
}

const schema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
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

export const FamilleModel = model<Famille>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
