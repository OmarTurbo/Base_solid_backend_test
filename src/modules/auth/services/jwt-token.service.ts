import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { ITokenService } from "../interfaces/token-service.interface";
import { env } from "../../../config/env";
import { JwtPayload } from "../../../interfaces";

@injectable()
export class JwtTokenService implements ITokenService {
  sign(payload: JwtPayload): string {
    const token = jwt.sign(payload, env.JWT_SECRET_KEY, {
      expiresIn: env.JWT_EXPIRY_DATE as jwt.SignOptions["expiresIn"],
    });

    return token;
  }

  verify(token: string): JwtPayload {
    return jwt.verify(token, env.JWT_SECRET_KEY) as JwtPayload;
  }
}