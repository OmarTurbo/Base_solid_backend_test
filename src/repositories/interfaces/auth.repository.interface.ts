import { IUser } from "../../interfaces";

export interface IAuthRepository {
  signUp(data: IUser): Promise<IUser>;
  findByUserName(username: string): Promise<IUser | null>
};