import { Router } from "express";
import { container } from "../../container";
import { MessageController } from "./message.controller";
import { MESSAGE_TYPES } from "./message.types";
import { protect, restrictTo } from "../../middlewares";
import { Role } from "../../enums";
import { messageSchema, replySchema } from "./helper";
import { validate } from "../../middlewares/validate.middleware";
import { publicMessageLimiter } from "../../config/rateLimiter";

export const messageRouter = Router();

const messageController = container.get<MessageController>(MESSAGE_TYPES.MessageController);

messageRouter.post(
  "/", 
  publicMessageLimiter,
  validate(messageSchema), 
  messageController.create
);

messageRouter.use(protect);
messageRouter.use(
  restrictTo(Role.ADMIN_ROLE, Role.USER_ROLE)
);


messageRouter.get("/", messageController.findAll);

messageRouter.patch(
  "/:id/reply",
  validate(replySchema),
  messageController.reply
);

messageRouter.get("/:id", messageController.findById);

messageRouter.delete("/:id", messageController.delete);
