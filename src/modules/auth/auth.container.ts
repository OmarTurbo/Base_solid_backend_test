import { ContainerModule } from "inversify";
import { AUTH_TYPES } from "./auth.types";
import { AuthRepository } from "../../repositories";
import { IAuthRepository } from "../../repositories/interfaces";
import { AuthController } from "./auth.controller";
import { LoginUserUseCase, RegisterUserUseCase } from "./use-cases";
import { JwtTokenService } from "./services/jwt-token.service";
import { ITokenService } from "./interfaces/token-service.interface";

export const authModule = new ContainerModule(({ bind }) => {
  bind<IAuthRepository>(AUTH_TYPES.AuthRepository).to(AuthRepository);

  bind<LoginUserUseCase>(AUTH_TYPES.LoginUserUseCase).to(LoginUserUseCase);
  bind<RegisterUserUseCase>(AUTH_TYPES.RegisterUserUseCase).to(RegisterUserUseCase);

  bind<ITokenService>(AUTH_TYPES.TokenService).to(JwtTokenService);

  bind<AuthController>(AUTH_TYPES.AuthController).to(AuthController);
});