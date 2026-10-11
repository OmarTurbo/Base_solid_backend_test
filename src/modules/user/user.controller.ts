import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { catchAsync } from "../../utils";
import { USER_TYPES } from "./user.types";
import { GetAllUsersUseCase } from "./use-cases/getAllUsers.use-case";
import { GetUserByIdUseCase } from "./use-cases/getUserById.use-case";
import { UpdateUserUseCase } from "./use-cases/updateUser.use-case";
import { DeleteUserUseCase } from "./use-cases/deleteUser.use-case";

@injectable()
export class UserController {
  constructor(
    @inject(USER_TYPES.GetAllUsersUseCase) private getAllUsersUseCase: GetAllUsersUseCase,
    @inject(USER_TYPES.GetUserByIdUseCase) private getUserByIdUseCase: GetUserByIdUseCase,
    @inject(USER_TYPES.UpdateUserUseCase) private updateUserUseCase: UpdateUserUseCase,
    @inject(USER_TYPES.DeleteUserUseCase) private deleteUserUseCase: DeleteUserUseCase
  ) {}
  
  getAllUsers = catchAsync(async(req: Request, res: Response) => {
    const users = await this.getAllUsersUseCase.execute();
      res.status(200).json({ status: "success", users});
  });

  getUserById = catchAsync(async(req: Request, res: Response) => {
    const userId = req.params.id as string;
    const user = await this.getUserByIdUseCase.execute(userId);
      res.status(200).json({ status: "success", user});
  });

  updateUser = catchAsync(async(req: Request, res: Response) =>  {
    const userId = req.params.id as string;
    const data = req.body;
    const user = await this.updateUserUseCase.execute(userId, data);
      res.status(200).json({ status: "success", user});
  });

  deleteUser = catchAsync(async(req: Request, res: Response) => {
    const userId = req.params.id as string;
    await this.deleteUserUseCase.execute(userId);
      res.status(204).json({ status: "success", data: null});
  });    
};