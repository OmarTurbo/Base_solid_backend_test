import { injectable } from "inversify";
import Message from "../models/message.model";
import { IMessage } from "../interfaces";
import {
  IMessageRepository,
} from "./interfaces/message.repository.interface";
import { MessageStatus } from "../enums";

@injectable()
export class MessageRepository implements IMessageRepository {
  async create(data: Partial<IMessage>): Promise<IMessage> {
    const message = await Message.create(data);
    return message.toObject() as IMessage;
  }

  async findAll(): Promise<IMessage[]> {
    const messages = await Message.find();
    return messages;
  }

  async findById(id: string): Promise<IMessage | null> {
    return Message.findById(id).lean<IMessage | null>();
  }

  async replyById(
    id: string,
    reply: string
  ): Promise<IMessage | null> {
    return Message.findByIdAndUpdate(
      id,
      {
        reply,
        status: MessageStatus.REPLIED,
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean<IMessage | null>();
  }

  async deleteById(id: string): Promise<IMessage | null> {
    return Message.findByIdAndDelete(id).lean<IMessage | null>();
  }
}
