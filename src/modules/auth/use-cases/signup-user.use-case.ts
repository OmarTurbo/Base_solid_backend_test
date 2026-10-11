import { inject, injectable } from "inversify";
import { AUTH_TYPES } from "../auth.types";
import { IUser } from "../../../interfaces";
import { IAuthRepository } from "../../../repositories/interfaces";

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject(AUTH_TYPES.AuthRepository)
    private authRepo: IAuthRepository
  ) {}

  async execute(data: IUser) {
    const user = await this.authRepo.signUp(data);
    return user;
  }
}