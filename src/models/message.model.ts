import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces";
import { MessageStatus } from "../enums";

const messageSchema = new Schema<IMessage>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  nationality: { type: String, required: true },
  message: { type: String, required: true },

  reply: { type: String, default: "" },
  status: { type: String, enum: Object.values(MessageStatus), default: MessageStatus.PENDING },
},
{ timestamps: true }
);

export default mongoose.model<IMessage>("Message", messageSchema);