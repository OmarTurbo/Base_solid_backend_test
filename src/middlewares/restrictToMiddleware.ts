import { Request, Response, NextFunction } from "express";
import {AppError} from "../utils";
import { MIDDLEWARE_ERRORS } from "./errorMessage";

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new AppError(
        MIDDLEWARE_ERRORS.NOT_AUTHENTICATED.message,
         MIDDLEWARE_ERRORS.NOT_AUTHENTICATED.statusCode));
    }

    if (!roles.includes(user.role)) {
      return next(new AppError(
        MIDDLEWARE_ERRORS.FORBIDDEN.message,
         MIDDLEWARE_ERRORS.FORBIDDEN.statusCode
      ));
    }

    next();
  };
};
