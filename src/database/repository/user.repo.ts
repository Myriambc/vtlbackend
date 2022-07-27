import User, { UserModel } from "../model/user.model";
import Role, { RoleModel } from "../model/role.model";
import { Types } from "mongoose";

export default class UserRepo {
  // function find user by id
  public static async findById(id: Types.ObjectId): Promise<User | null> {
    return await UserModel.findById(id)
      .select("+email +password +roles")
      .populate({
        path: "roles",
        select: "code",
      })
      .lean<User>();
  }
  public static async createUser(user: User): Promise<User | null> {
    return await UserModel.create(user);
  }

  //function find user by email
  public static async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email: email })
      .select("+email +password +roles")
      .populate({
        path: "roles",
        select: "code",
      });
  }

  //function update user info
  public static async updateUser(id: Types.ObjectId, user: any): Promise<any> {
    return await UserModel.findByIdAndUpdate(id, user).lean();
  }

  public static async deleteUser(id: Types.ObjectId): Promise<any> {
    return await UserModel.findByIdAndDelete(id).lean();
  }

  //function find all users
  public static async findAll(): Promise<User[]> {
    return await UserModel.find({})
      .select("+email +name ")
      .populate({
        path: "roles",
        select: "label",
      })
      .lean<User[]>();
  }
}
