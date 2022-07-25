import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "Phase";
export const COLLECTION_NAME = "phases";

export default interface Phase extends Document {
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

export const PhaseModel = model<Phase>(DOCUMENT_NAME, schema, COLLECTION_NAME);
