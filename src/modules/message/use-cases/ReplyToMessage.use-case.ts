import { inject, injectable } from "inversify";
import { MESSAGE_TYPES } from "../message.types";
import { validateMessageId } from "../helper/validateMessageId";
import { IMessageRepository } from "../../../repositories/interfaces";
import { IMessage } from "../../../interfaces";
import { AppError } from "../../../utils";
import { MESSAGE_ERRORS } from "../errorMessage";

@injectable()
export class ReplyToMessageUseCase {
  constructor(
    @inject(MESSAGE_TYPES.MessageRepository)
    private messageRepository: IMessageRepository
  ) {}

  async execute(id: string, reply: string): Promise<IMessage> {
    validateMessageId(id);
    const message = await this.messageRepository.replyById(id, reply);
    if (!message) {
      throw new AppError(
        MESSAGE_ERRORS.NOT_FOUND.message,
        MESSAGE_ERRORS.NOT_FOUND.statusCode
      );
    }
    return message;
  }
}
