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
  public static async updateInfo(user: User): Promise<any> {
    return await UserModel.updateOne(
      { _id: user._id },
      { $set: { ...user } }
    ).lean();
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
