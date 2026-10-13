import { Router } from "express";
import { container } from "../../container";
import { FloorController } from "./floor.controller";
import { FLOOR_TYPES } from "./floor.types";
import { validate } from "../../middlewares/validate.middleware";
import { createFloorSchema, updateFloorSchema } from "./helper";
import { protect, restrictTo } from "../../middlewares";
import { Role } from "../../enums";


export const floorRouter = Router();
const floorController = container.get<FloorController>(FLOOR_TYPES.FloorController);

floorRouter.get("/", floorController.findAll);
floorRouter.get("/:id", floorController.findById);

floorRouter.use(protect, restrictTo(Role.ADMIN_ROLE));

floorRouter.post("/", validate(createFloorSchema), floorController.create);
floorRouter.patch("/:id", validate(updateFloorSchema), floorController.update);
floorRouter.delete("/:id", floorController.delete);
