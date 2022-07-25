import { model, Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Role from "./role.model";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User extends Document {
  name: string;
  email?: string;
  password?: string;
  roles: Role[];
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  isCorrectPassword: (a: string, b: string) => Promise<boolean>;
  generateToken: (a: { id: string }, b: string, c: string) => {};
}

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      select: false,
    },
    password: {
      type: String,
      select: false,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
      required: true,
      select: false,
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

schema.pre("save", async function (next): Promise<void> {
  // crypt password
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

schema.methods.isCorrectPassword = async function (
  psw1: string,
  psw2: string
): Promise<boolean> {
  return await bcrypt.compare(psw1, psw2);
};
schema.methods.generateToken = function (
  id: string,
  secert: string,
  expire: string
): String {
  return jwt.sign(id, secert, {
    expiresIn: expire,
  });
};

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
