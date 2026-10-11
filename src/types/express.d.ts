import { IUser } from "../interfaces";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}

export {};