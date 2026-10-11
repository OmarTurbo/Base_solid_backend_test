import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { catchAsync, AppError } from "../utils";
import { DecodedToken } from "../interfaces";
import { MIDDLEWARE_ERRORS } from "./errorMessage";
import { env } from "../config/env";

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new AppError(
      MIDDLEWARE_ERRORS.NOT_AUTHENTICATED.message,
       MIDDLEWARE_ERRORS.NOT_AUTHENTICATED.statusCode);
  }

  const decoded = jwt.verify(token, env.JWT_SECRET_KEY!) as DecodedToken;

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError(
      MIDDLEWARE_ERRORS.NOT_FOUND.message,
       MIDDLEWARE_ERRORS.NOT_FOUND.statusCode);
  }

  req.user = user;

  next();
});
