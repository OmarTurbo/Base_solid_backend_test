import { Router } from "express";
import { protect, 
  restrictTo } from "../../middlewares";
import { Role } from "../../enums";
import { UserController
 } from "./user.controller";
import { container } from "../../container";
import { USER_TYPES } from "./user.types";
import { updateUserSchema } from "./helper/user.schema";
import { validate } from "../../middlewares/validate.middleware";

export const userRouter = Router();
const userController = container.get<UserController>(USER_TYPES.UserController);

userRouter.get("/", 
  protect, 
  userController.getAllUsers
);
userRouter.get("/:id", 
  protect, 
  userController.getUserById
);
userRouter.patch("/:id", 
  protect, 
  restrictTo(Role.ADMIN_ROLE), 
  validate(updateUserSchema), 
  userController.updateUser
);
userRouter.delete("/:id", 
  protect, 
  restrictTo(Role.ADMIN_ROLE), 
  userController.deleteUser
);
