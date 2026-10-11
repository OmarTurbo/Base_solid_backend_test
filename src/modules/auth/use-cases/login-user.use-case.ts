import { inject, injectable } from "inversify";
import { AUTH_TYPES } from "../auth.types";
import { AppError } from "../../../utils";
import { IAuthRepository } from "../../../repositories/interfaces";
import { AUTH_ERRORS } from "../errorMessage";
import { ITokenService } from "../interfaces/token-service.interface";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject(AUTH_TYPES.AuthRepository)
    private authRepo: IAuthRepository,
    @inject(AUTH_TYPES.TokenService)
    private tokenService: ITokenService,
  ) {}
  
  async execute(username: string, password: string) {
    const user = await this.authRepo.findByUserName(username);

    if (!user) {
      throw new AppError(
        AUTH_ERRORS.INVALID_CREDENTIALS.message,
        AUTH_ERRORS.INVALID_CREDENTIALS.statusCode
      );
    }
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      throw new AppError(
        AUTH_ERRORS.INVALID_CREDENTIALS.message,
        AUTH_ERRORS.INVALID_CREDENTIALS.statusCode
      );
    }
   
    const token = this.tokenService.sign({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion ?? 0,
    });
  

    return { user, token };
  }
}
