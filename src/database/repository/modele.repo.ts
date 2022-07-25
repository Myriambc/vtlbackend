import { Types } from "mongoose";
import Modele, { ModeleModel } from "../model/modele.model";

export default class ModeleRepo {
  public static async findAll(): Promise<Modele[]> {
    return await ModeleModel.find({}).lean<Modele[]>();
  }
  public static async createModele(modele): Promise<Modele | null> {
    return await ModeleModel.create(modele);
  }

  public static async updateModele(
    id: Types.ObjectId,
    modele
  ): Promise<Modele | null> {
    return await ModeleModel.findByIdAndUpdate(id, modele, { new: true });
  }

  public static async deleteModele(id: Types.ObjectId): Promise<null> {
    return await ModeleModel.findByIdAndDelete(id);
  }
}
