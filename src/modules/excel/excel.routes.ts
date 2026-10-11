import { Router } from "express";
import { uploadExcel } from "../../utils/multer";
import { container } from "../../container";
import { UnitExcelController } from "./excel.controller";
import { EXCEL_TYPES } from "./excel.type";
import { protect, restrictTo } from "../../middlewares";
import { Role } from "../../enums";


export const excelRouter = Router();

const controller = container.get<UnitExcelController>(EXCEL_TYPES.ExcelController);

excelRouter.post("/import-excel", protect , restrictTo(Role.ADMIN_ROLE), uploadExcel.single("file"), controller.importExcel);
excelRouter.get("/export-excel", protect, restrictTo(Role.ADMIN_ROLE), controller.exportExcel);

