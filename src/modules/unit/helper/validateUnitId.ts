import mongoose from "mongoose";
import { AppError } from "../../../utils";
import { UNIT_ERRORS } from "../errorMessage";

export const validateUnitId = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(
            UNIT_ERRORS.INVALID_ID.message,
            UNIT_ERRORS.INVALID_ID.statusCode,
        );
    }
};
