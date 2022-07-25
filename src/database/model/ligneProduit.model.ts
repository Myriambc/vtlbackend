import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "LigneProduit";
export const COLLECTION_NAME = "lignes-produits";

export default interface LigneProduit extends Document {
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

export const LigneProduitModel = model<LigneProduit>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
