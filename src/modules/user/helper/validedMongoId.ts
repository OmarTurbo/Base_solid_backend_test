import mongoose from "mongoose";
import { AppError } from "../../../utils";
import { USER_ERRORS } from "../errorMessage";

export const validateID = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(USER_ERRORS.INVALID_ID.message, USER_ERRORS.INVALID_ID.statusCode);
  }
};