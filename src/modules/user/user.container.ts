import { ContainerModule } from "inversify";
import { USER_TYPES } from "./user.types";
import { UserRepository } from "../../repositories";
import { IUserRepository } from "../../repositories/interfaces";
import { UserController } from "./user.controller";
import { GetAllUsersUseCase } from "./use-cases/getAllUsers.use-case";
import { GetUserByIdUseCase } from "./use-cases/getUserById.use-case";
import { UpdateUserUseCase } from "./use-cases/updateUser.use-case";
import { DeleteUserUseCase } from "./use-cases/deleteUser.use-case";

export const userModule = new ContainerModule(({ bind }) => {
  bind<IUserRepository>(USER_TYPES.UserRepository).to(UserRepository);
  bind<UserController>(USER_TYPES.UserController).to(UserController);
  
  bind<GetAllUsersUseCase>(USER_TYPES.GetAllUsersUseCase).to(GetAllUsersUseCase);
  bind<GetUserByIdUseCase>(USER_TYPES.GetUserByIdUseCase).to(GetUserByIdUseCase);
  bind<UpdateUserUseCase>(USER_TYPES.UpdateUserUseCase).to(UpdateUserUseCase);
  bind<DeleteUserUseCase>(USER_TYPES.DeleteUserUseCase).to(DeleteUserUseCase);
});