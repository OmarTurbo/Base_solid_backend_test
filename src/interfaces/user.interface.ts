import { Document, Types } from "mongoose";
import { Role, UserType } from "../enums";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  role: Role;
  type: UserType;
  password?: string;
  comparePassword(candidate: string): Promise<boolean>;
}
