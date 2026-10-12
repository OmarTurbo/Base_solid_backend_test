import mongoose from "mongoose";
import { AppError } from "../../../utils";
import { FLOOR_ERRORS } from "../errorMessage";

export const validateFloorId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(
      FLOOR_ERRORS.INVALID_ID.message,
      FLOOR_ERRORS.INVALID_ID.statusCode,
    );
  }
};
