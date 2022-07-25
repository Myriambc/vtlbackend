import { Types } from "mongoose";
import Saison, { SaisonModel } from "../model/saison.model";

export default class SaisonRepo {
  public static async findAll(): Promise<Saison[]> {
    return await SaisonModel.find({}).lean<Saison[]>();
  }
  public static async createSaison(saision: {
    label: string;
  }): Promise<Saison | null> {
    return await SaisonModel.create(saision);
  }
  public static async updateSaison(
    id: Types.ObjectId,
    saison
  ): Promise<Saison | null> {
    return await SaisonModel.findByIdAndUpdate(id, saison);
  }
  public static async deleteSaison(id: Types.ObjectId): Promise<null> {
    return await SaisonModel.findByIdAndDelete(id);
  }
}
