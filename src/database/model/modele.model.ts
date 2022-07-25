import { NextFunction } from "express";
import mongoose, { model, Schema, Document, Types } from "mongoose";

export const DOCUMENT_NAME = "Modele";
export const COLLECTION_NAME = "modeles";

export default interface Modele extends Document {
  refArticle: string;
  client: Types.ObjectId;
  saison: Types.ObjectId;
  ligneProduit: Types.ObjectId;
  phase: Types.ObjectId;
  famille: Types.ObjectId;
  deliveryDate: Date;
  colorCode: string;
  label: string;
  img: string;
}

const schema = new Schema(
  {
    refArticle: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },
    client: {
      type: Types.ObjectId,
      required: true,
      ref: "Client",
    },
    saison: {
      type: Types.ObjectId,
      required: true,
      ref: "Saison",
    },
    ligneProduit: {
      type: Types.ObjectId,
      required: true,
      ref: "LigneProduit",
    },
    phase: {
      type: Types.ObjectId,
      required: true,
      ref: "Phase",
    },
    famille: {
      type: Types.ObjectId,
      required: true,
      ref: "Famille",
    },
    colorCode: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    deliveryDate: {
      type: Date,
      default: null,
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
schema.pre(/^find/, function (next: NextFunction) {
  this.populate({
    path: "client",
    select: "label",
  }) //@ts-ignore
    .populate({
      path: "saison",
      select: "label",
    })
    .populate({
      path: "famille",
      select: "label",
    })
    .populate({
      path: "ligneProduit",
      select: "label",
    })
    .populate({
      path: "phase",
      select: "label",
    });
  next();
});

export const ModeleModel = model<Modele>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
