import { Document } from "mongoose";
import { MessageStatus } from "../enums";

export interface IMessage extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  message: string;
  reply?: string;
  status: MessageStatus;
}