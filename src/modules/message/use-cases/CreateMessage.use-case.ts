import { inject, injectable } from "inversify";
import { MESSAGE_TYPES } from "../message.types";
import { IMessageRepository } from "../../../repositories/interfaces";
import { IMessage } from "../../../interfaces";

@injectable()
export class CreateMessageUseCase {
  constructor(
    @inject(MESSAGE_TYPES.MessageRepository)
    private messageRepository: IMessageRepository
  ) {}

  async execute(data: IMessage): Promise<IMessage> {
    return this.messageRepository.create(data);
  }
}