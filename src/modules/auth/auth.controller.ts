import { Request, Response } from "express";
import { AUTH_TYPES } from "./auth.types";
import { catchAsync } from "../../utils";
import { inject, injectable } from "inversify";
import { LoginUserUseCase } from "./use-cases/login-user.use-case";
import { RegisterUserUseCase } from "./use-cases/signup-user.use-case";
import { env } from "../../config/env";

@injectable()
export class AuthController {
  constructor(
    @inject(AUTH_TYPES.LoginUserUseCase)
    private loginUserUseCase: LoginUserUseCase,

    @inject(AUTH_TYPES.RegisterUserUseCase)
    private registerUserUseCase: RegisterUserUseCase
  ) {}

  signUp = catchAsync(async (req: Request, res: Response) => {
    const user = await this.registerUserUseCase.execute(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const { user, token } = await this.loginUserUseCase.execute(
      username,
      password
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: Number(env.cookieMaxAgeMs),
      path: "/",
    });

    res.status(200).json({
      status: "success",
      user,
      token,
    });
  });

  logout = catchAsync(async (req: Request, res: Response) => {
    if (req.user) {
      await req.user.updateOne({ $inc: { tokenVersion: 1 } });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  });

  me = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
      user: req.user,
    });
  });
}
