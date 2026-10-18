import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import fs from "fs";
import { EXCEL_TYPES } from "./excel.type";
import { EXCEL_ERROR } from "./error.message";
import { AppError } from "../../utils";
import { ImportUnitsExcelUseCase } from "./use-case/import-units-excel.use-case";
import { ExportUnitsExcelUseCase } from "./use-case/export-units-excel.use-case";
import { catchAsync } from "../../utils";

@injectable()
export class UnitExcelController {
  constructor(
    @inject(EXCEL_TYPES.ImportUnitsExcelUseCase)
    private readonly importUnitsExcelUseCase: ImportUnitsExcelUseCase,

    @inject(EXCEL_TYPES.ExportUnitsExcelUseCase)
    private readonly exportUnitsExcelUseCase: ExportUnitsExcelUseCase
  ) { }
  importExcel = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
      throw new AppError(
        EXCEL_ERROR.NO_FILE.message,
        EXCEL_ERROR.NO_FILE.statusCode,
      );
    }
    const result = await this.importUnitsExcelUseCase.execute(req.file.path);
    res.status(200).json({ status: "success", data: result });
  });

  exportExcel = catchAsync(async (_req: Request, res: Response) => {
    const filePath = await this.exportUnitsExcelUseCase.execute();

    res.download(filePath, "units-export.xlsx", (err) => {
      fs.unlink(filePath, () => { });
      if (err && !res.headersSent) {
        res.status(500).json({ message: "Failed to download file" });
      }
    });
  });
}
