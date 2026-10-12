export const MESSAGE_TYPES = {
  MessageRepository: Symbol.for("MessageRepository"),
  MessageController: Symbol.for("MessageController"),
  MessageService: Symbol.for("MessageService"),
  CreateMessageUseCase: Symbol.for("CreateMessageUseCase"),
  GetAllMessagesUseCase: Symbol.for("GetAllMessagesUseCase"),
  GetMessageByIdUseCase: Symbol.for("GetMessageByIdUseCase"),
  ReplyToMessageUseCase: Symbol.for("ReplyToMessageUseCase"),
  DeleteMessageUseCase: Symbol.for("DeleteMessageUseCase"),
};
