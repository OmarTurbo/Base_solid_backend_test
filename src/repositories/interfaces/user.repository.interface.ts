import { IUser, IUserResponse } from "../../interfaces";

export interface IUserRepository {
  getAllUsers (): Promise<IUserResponse[]>;
  getUserById (id: string): Promise<IUserResponse | null>;
  updateUser ( id: string, data: Partial<IUser>): Promise<IUserResponse | null>;
  deleteUser (id: string): Promise<void | null>;
};