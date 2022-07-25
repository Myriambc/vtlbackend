import Role, { RoleModel } from "../model/role.model";

export default class RoleRepo {
  public static async findByCode(code: string): Promise<Role | null> {
    return await RoleModel.findOne({ code }).lean<Role>();
  }
  public static async createRole(role: {
    label: string;
    code: string;
  }): Promise<Role | null> {
    return await RoleModel.create(role);
  }
  public static async findAll(): Promise<Role[]> {
    return await RoleModel.find({}).lean<Role[]>();
  }
}
