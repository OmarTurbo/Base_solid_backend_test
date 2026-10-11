import { inject, injectable } from "inversify";
import { MESSAGE_TYPES } from "../message.types";
import { IMessageRepository } from "../../../repositories/interfaces";

@injectable()
export class GetAllMessagesUseCase {
  constructor(
    @inject(MESSAGE_TYPES.MessageRepository)
    private messageRepository: IMessageRepository
  ) {}

  async execute() {
    return this.messageRepository.findAll();
  }
}