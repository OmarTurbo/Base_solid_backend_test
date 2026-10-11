import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { catchAsync } from "../../utils";
import { MESSAGE_TYPES } from "./message.types";
import { CreateMessageUseCase, 
  GetAllMessagesUseCase,
  GetMessageByIdUseCase,
  ReplyToMessageUseCase,
  DeleteMessageUseCase
} from "./use-cases";

@injectable()
export class MessageController {
  constructor(
    @inject(MESSAGE_TYPES.CreateMessageUseCase)
    private createMessageUseCase: CreateMessageUseCase,

    @inject(MESSAGE_TYPES.GetAllMessagesUseCase)
    private getAllMessagesUseCase: GetAllMessagesUseCase,

    @inject(MESSAGE_TYPES.GetMessageByIdUseCase)
    private getMessageByIdUseCase: GetMessageByIdUseCase,

    @inject(MESSAGE_TYPES.ReplyToMessageUseCase)
    private replyToMessageUseCase: ReplyToMessageUseCase,

    @inject(MESSAGE_TYPES.DeleteMessageUseCase)
    private deleteMessageUseCase: DeleteMessageUseCase
  ) {}

  create = catchAsync(async (req: Request, res: Response) => {
    const message = await this.createMessageUseCase.execute(req.body);
    res.status(201).json({ status: "success", message });
  });

  findAll = catchAsync(async (req: Request, res: Response) => {
    const messages = await this.getAllMessagesUseCase.execute();
    res.status(200).json({ status: "success", messages });
  });

  findById = catchAsync(async (req: Request, res: Response) => {
    const messageId = req.params.id as string;
    const message = await this.getMessageByIdUseCase.execute(messageId);
    res.status(200).json({ status: "success", message });
  });

  reply = catchAsync(async (req: Request, res: Response) => {
    const messageId = req.params.id as string;
    const message = await this.replyToMessageUseCase.execute(
      messageId,
      req.body.reply
    );
    res.status(200).json({ status: "success", message });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const messageId = req.params.id as string;
    await this.deleteMessageUseCase.execute(messageId);
    res.status(204).json({ status: "success" });
  });
}