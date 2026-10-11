import { inject, injectable } from "inversify";
import { USER_TYPES } from "../user.types";
import { IUserResponse } from "../../../interfaces";
import { IUserRepository } from "../../../repositories/interfaces";

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject(USER_TYPES.UserRepository) 
    private userRepo: IUserRepository
  ) {}

  async execute(): Promise<IUserResponse[]> {
    const users = await this.userRepo.getAllUsers();
    return users;
  }
}