import { Types } from "mongoose";
import Client, { ClientModel } from "../model/client.model";

export default class ClientRepo {
  public static async findAll(): Promise<Client[]> {
    return await ClientModel.find({}).lean<Client[]>();
  }
  public static async createClient(client: {
    label: string;
    img: string;
  }): Promise<Client | null> {
    return await ClientModel.create(client);
  }
  public static async updateClient(
    id: Types.ObjectId,
    client
  ): Promise<Client | null> {
    return await ClientModel.findByIdAndUpdate(id, client, { new: true });
  }
  public static async deleteClient(id: Types.ObjectId): Promise<null> {
    return await ClientModel.findByIdAndDelete(id);
  }
}
