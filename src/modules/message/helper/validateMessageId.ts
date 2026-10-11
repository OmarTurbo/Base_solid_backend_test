import mongoose from "mongoose";
import { AppError } from "../../../utils";
import { MESSAGE_ERRORS } from "../errorMessage";

export const validateMessageId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(
      MESSAGE_ERRORS.INVALID_ID.message,
      MESSAGE_ERRORS.INVALID_ID.statusCode
    );
  }
};