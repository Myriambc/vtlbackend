import { Types } from "mongoose";
import Famille, { FamilleModel } from "../model/famille.model";

export default class FamilleRepo {
  public static async findAll(): Promise<Famille[]> {
    return await FamilleModel.find({}).lean<Famille[]>();
  }
  public static async createFamille(famille: {
    label: string;
  }): Promise<Famille | null> {
    return await FamilleModel.create(famille);
  }
  public static async updateFamille(
    id: Types.ObjectId,
    famille
  ): Promise<Famille | null> {
    return await FamilleModel.findByIdAndUpdate(id, famille);
  }
  public static async deleteFamille(id: Types.ObjectId): Promise<null> {
    return await FamilleModel.findByIdAndDelete(id);
  }
}
