import { inject, injectable } from "inversify";
import { USER_TYPES } from "../user.types";
import { IUserResponse } from "../../../interfaces";
import { IUserRepository } from "../../../repositories/interfaces";
import { AppError } from "../../../utils";
import { USER_ERRORS } from "../errorMessage";
import { validateID } from "../helper/validedMongoId";


@injectable()
export class GetUserByIdUseCase {
  constructor(
    @inject(USER_TYPES.UserRepository) private userRepo: IUserRepository
  ) {}

  async execute(id: string): Promise<IUserResponse | null> {
    validateID(id);
    const user = await this.userRepo.getUserById(id);
    if(!user) {
       throw new AppError(USER_ERRORS.NOT_FOUND.message, USER_ERRORS.NOT_FOUND.statusCode);
     }
    return user;
  }
}