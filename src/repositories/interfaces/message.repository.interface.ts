import { IMessage } from "../../interfaces";

export interface IFindAllMessagesResult {
  results: number;
  messages: IMessage[];
}

export interface IMessageRepository {
  create(data: Partial<IMessage>): Promise<IMessage>;

  findAll(): Promise<IMessage[]>;

  findById(id: string): Promise<IMessage | null>;

  replyById(id: string, reply: string): Promise<IMessage | null>;

  deleteById(id: string): Promise<IMessage | null>;
}
