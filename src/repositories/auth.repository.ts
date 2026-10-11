import { injectable } from "inversify";
import { IUser } from "../interfaces";
import { IAuthRepository } from "./interfaces";
import { User } from "../models";

@injectable()
export class AuthRepository implements IAuthRepository {
  async signUp(data: IUser) {
    return User.create(data);
  };

  async findByUserName(username: string): Promise<IUser | null> {
      return User.findOne({ username }).select("+password"); 
  }  
}