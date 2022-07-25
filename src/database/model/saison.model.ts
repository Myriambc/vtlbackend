import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "Saison";
export const COLLECTION_NAME = "saisons";

export default interface Saison extends Document {
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

export const SaisonModel = model<Saison>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
