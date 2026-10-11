import { inject, injectable } from "inversify";
import { MESSAGE_TYPES } from "../message.types";
import { validateMessageId } from "../helper/validateMessageId";
import { IMessageRepository } from "../../../repositories/interfaces";
import { AppError } from "../../../utils";
import { MESSAGE_ERRORS } from "../errorMessage";

@injectable()
export class GetMessageByIdUseCase {
  constructor(
    @inject(MESSAGE_TYPES.MessageRepository)
    private messageRepository: IMessageRepository
  ) {}

  async execute(id: string) {
    validateMessageId(id);
    const message = await this.messageRepository.findById(id);
    if (!message) {
      throw new AppError(
        MESSAGE_ERRORS.NOT_FOUND.message,
        MESSAGE_ERRORS.NOT_FOUND.statusCode
      );
    }
    return message;
  }
}
