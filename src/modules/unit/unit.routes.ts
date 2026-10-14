import { Router } from "express";
import { container } from "../../container";
import { UnitController } from "./unit.controller";
import { UNIT_TYPES } from "./unit.types";
import { validate } from "../../middlewares/validate.middleware";
import { protect, restrictTo } from "../../middlewares";
import { Role } from "../../enums";
import { createUnitSchema, updateUnitSchema } from "./helper/unit.schema";


export const unitRouter = Router();
const unitController = container.get<UnitController>(UNIT_TYPES.unitController);

unitRouter.get("/", unitController.findAll);
unitRouter.get("/:id", unitController.findById);

unitRouter.use(protect, restrictTo(Role.ADMIN_ROLE));

unitRouter.post("/", validate(createUnitSchema), unitController.create);
unitRouter.patch("/:id", validate(updateUnitSchema), unitController.update);
unitRouter.delete("/:id", unitController.delete);
