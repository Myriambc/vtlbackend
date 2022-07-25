import { Types } from "mongoose";
import Phase, { PhaseModel } from "../model/phase.model";

export default class PhaseRepo {
  public static async findAll(): Promise<Phase[]> {
    return await PhaseModel.find({}).lean<Phase[]>();
  }
  public static async createPhase(phase: {
    label: string;
  }): Promise<Phase | null> {
    return await PhaseModel.create(phase);
  }
  public static async updatePhase(
    id: Types.ObjectId,
    phase
  ): Promise<Phase | null> {
    return await PhaseModel.findByIdAndUpdate(id, phase, { new: true });
  }
  public static async deletePhase(id: Types.ObjectId): Promise<null> {
    return await PhaseModel.findByIdAndDelete(id);
  }
}
