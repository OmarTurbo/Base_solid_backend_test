import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import fs from "fs";
import { EXCEL_TYPES } from "./excel.type";
import { ImportUnitsExcelUseCase } from "./use-case/import-units-excel.use-case";
import { ExportUnitsExcelUseCase } from "./use-case/export-units-excel.use-case";

@injectable()
export class UnitExcelController {
  constructor(
    @inject(EXCEL_TYPES.ImportUnitsExcelUseCase)
    private readonly importUnitsExcelUseCase: ImportUnitsExcelUseCase,

    @inject(EXCEL_TYPES.ExportUnitsExcelUseCase)
    private readonly exportUnitsExcelUseCase: ExportUnitsExcelUseCase
  ) {}

  importExcel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Excel file is required",
        });
      }

      const result = await this.importUnitsExcelUseCase.execute(
        req.file.path
      );

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  exportExcel = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filePath = await this.exportUnitsExcelUseCase.execute();

      // Delete the temp file from disk after the stream finishes
    //  res.download(filePath, "units-export.xlsx", (err) => {
        // Clean up regardless of whether download succeeded
      //  fs.unlink(filePath, () => {});
      //  if (err && !res.headersSent) next(err);
     // });
    } catch (error) {
      next(error);
    }
  };
}
