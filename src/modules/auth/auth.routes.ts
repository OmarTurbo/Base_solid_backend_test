import { Router } from "express";
import { AuthController
 } from "./auth.controller";
import { protect, 
  restrictTo } from "../../middlewares";
import { Role } from "../../enums";
import { AUTH_TYPES } from "./auth.types";
import { container } from "../../container";
import { authLimiter } from "../../config/rateLimiter";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, signUpSchema } from "./auth.schema";

export const authRouter = Router();
const authController = container.get<AuthController>(AUTH_TYPES.AuthController);

authRouter.post("/signup", 
  authLimiter, 
  protect, 
  restrictTo(Role.ADMIN_ROLE), 
  validate(signUpSchema), 
  authController.signUp
);
authRouter.post("/login", 
  authLimiter, 
  validate(loginSchema), 
  authController.login
);
authRouter.post("/logout", 
  protect, 
  authController.logout
);

authRouter.get("/me", 
  protect, 
  authController.me
);
