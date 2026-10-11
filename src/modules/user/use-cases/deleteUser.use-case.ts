import { inject, injectable } from 'inversify';
import { USER_TYPES } from '../user.types';
import { IUserRepository } from '../../../repositories/interfaces';
import { AppError } from '../../../utils';
import { validateID } from '../helper/validedMongoId';
import { USER_ERRORS } from '../errorMessage';

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(USER_TYPES.UserRepository) private userRepo: IUserRepository
  ) {}
  
  async execute(id: string): Promise<void | null> {
    validateID(id);
    const user = await this.userRepo.deleteUser(id);
    if (!user) {
      throw new AppError(USER_ERRORS.NOT_FOUND.message, USER_ERRORS.NOT_FOUND.statusCode);
    }
  }
};