import { injectable } from "inversify";
import User from "../models/user.model";
import { IUser, IUserResponse } from "../interfaces";
import { IUserRepository } from "./interfaces";

@injectable()
export class UserRepository implements IUserRepository {

  async getAllUsers() {
    return User.find().select("-password").lean<IUserResponse[]>();
  };

  async getUserById(id: string): Promise<IUserResponse | null> {
    return User.findById(id).select("-password").lean<IUserResponse | null>();
  };

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
  }

  async deleteUser(id: string): Promise<void | null> {
    return User.findByIdAndDelete(id);
  }
}