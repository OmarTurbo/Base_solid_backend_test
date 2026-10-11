import { ContainerModule } from "inversify";
import { MESSAGE_TYPES } from "./message.types";
import { MessageController } from "./message.controller";
import { CreateMessageUseCase, 
  GetAllMessagesUseCase,
  GetMessageByIdUseCase,
  ReplyToMessageUseCase,
  DeleteMessageUseCase
} from "./use-cases";
import { IMessageRepository } from "../../repositories/interfaces";
import { MessageRepository } from "../../repositories/message.repository";

export const messageModule = new ContainerModule(({ bind }) => {
  bind<IMessageRepository>(MESSAGE_TYPES.MessageRepository).to(MessageRepository);

  bind<CreateMessageUseCase>(MESSAGE_TYPES.CreateMessageUseCase).to(CreateMessageUseCase);
  bind<GetAllMessagesUseCase>(MESSAGE_TYPES.GetAllMessagesUseCase).to(GetAllMessagesUseCase);
  bind<GetMessageByIdUseCase>(MESSAGE_TYPES.GetMessageByIdUseCase).to(GetMessageByIdUseCase);
  bind<ReplyToMessageUseCase>(MESSAGE_TYPES.ReplyToMessageUseCase).to(ReplyToMessageUseCase);
  bind<DeleteMessageUseCase>(MESSAGE_TYPES.DeleteMessageUseCase).to(DeleteMessageUseCase);

  bind<MessageController>(MESSAGE_TYPES.MessageController).to(MessageController);
});