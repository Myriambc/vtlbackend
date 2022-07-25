import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "Client";
export const COLLECTION_NAME = "clients";

export default interface Client extends Document {
  label: string;
  logo: string;
}

const schema = new Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    logo: {
      type: String,
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

export const ClientModel = model<Client>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
