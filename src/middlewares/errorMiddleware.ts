import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils";
import { MIDDLEWARE_ERRORS } from "./errorMessage";
import { ErrorNamesEnum } from "./errorNameEnum";

type ErrorHandler = (err: any) => AppError;

const errorHandlers = new Map<string | number, ErrorHandler>([
  [ErrorNamesEnum.CastError , (err) => new AppError(
    `${MIDDLEWARE_ERRORS.INVALID_VALUE.message}: ${err.path}.`,
     MIDDLEWARE_ERRORS.INVALID_VALUE.statusCode)],
  [ErrorNamesEnum.ValidationError, (err) => {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    return new AppError(
      `${MIDDLEWARE_ERRORS.INVALID_INPUT.message}: ${messages.join(", ")}`,
       MIDDLEWARE_ERRORS.INVALID_INPUT.statusCode);
  }],
  [ErrorNamesEnum.JsonWebTokenError, () => new AppError(
    MIDDLEWARE_ERRORS.INVALID_TOKEN.message,
     MIDDLEWARE_ERRORS.INVALID_TOKEN.statusCode)],
  [ErrorNamesEnum.TokenExpiredError, () => new AppError(
    MIDDLEWARE_ERRORS.TOKEN_EXPIRED.message,
     MIDDLEWARE_ERRORS.TOKEN_EXPIRED.statusCode)],
  [11000, (err) => {
    const field = Object.keys(err.keyValue)[0];
    return new AppError(
      `${MIDDLEWARE_ERRORS.DUPLICATE_FIELD.message}: ${field}`,
       MIDDLEWARE_ERRORS.DUPLICATE_FIELD.statusCode);
  }],
]);

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const key = err.code === 11000 ? 11000 : err.name;
  const handler = errorHandlers.get(key);

  const appError: AppError = handler
    ? handler(err)
    : err instanceof AppError
      ? err
      : new AppError(
          `${MIDDLEWARE_ERRORS.SOMETHING_WENT_WRONG.message}`,
          MIDDLEWARE_ERRORS.SOMETHING_WENT_WRONG.statusCode
        );

  return res.status(appError.statusCode).json({
    status: appError.status,
    message: appError.message,
  });
};
