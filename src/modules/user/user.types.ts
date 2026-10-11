export const USER_TYPES = {
  UserService: Symbol.for("UserService"),
  UserRepository: Symbol.for("UserRepository"),
  UserController: Symbol.for("UserController"),

  GetAllUsersUseCase: Symbol.for("GetAllUsersUseCase"),
  GetUserByIdUseCase: Symbol.for("GetUserByIdUseCase"),
  UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
  DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),
};