import { inject, injectable } from 'inversify';
import { USER_TYPES } from '../user.types';
import { IUser, IUserResponse } from '../../../interfaces';
import { IUserRepository } from '../../../repositories/interfaces';
import { AppError } from '../../../utils';
import { validateID } from '../helper/validedMongoId';
import { USER_ERRORS } from '../errorMessage';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(USER_TYPES.UserRepository) private userRepo: IUserRepository
  ) {}
  
  async execute(id: string, data: Partial<IUser>): Promise<{ user: IUserResponse | null }> {
    validateID(id);
    const allowedFields = new Set(["username", "email", "role", "type"]);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.has(key))
    ); 

    const updatedUser = await this.userRepo.updateUser(id, filteredData);
    
    if (!updatedUser) {
      throw new AppError(USER_ERRORS.NOT_FOUND.message, USER_ERRORS.NOT_FOUND.statusCode);
    }
    return { user: updatedUser };
  }
};