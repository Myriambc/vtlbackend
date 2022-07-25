import { Types } from "mongoose";
import LigneProduit, { LigneProduitModel } from "../model/ligneProduit.model";

export default class LigneProduitRepo {
  public static async findAll(): Promise<LigneProduit[]> {
    return await LigneProduitModel.find({}).lean<LigneProduit[]>();
  }
  public static async createLigneProduit(ligneProduit: {
    label: string;
  }): Promise<LigneProduit | null> {
    return await LigneProduitModel.create(ligneProduit);
  }
  public static async updateLigneProduit(
    id: Types.ObjectId,
    ligneProduit
  ): Promise<LigneProduit | null> {
    return await LigneProduitModel.findByIdAndUpdate(id, ligneProduit);
  }
  public static async deleteLigneProduit(id: Types.ObjectId): Promise<null> {
    return await LigneProduitModel.findByIdAndDelete(id);
  }
}
