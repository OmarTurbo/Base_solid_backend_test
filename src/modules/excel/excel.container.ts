import { ContainerModule } from "inversify";
import { EXCEL_TYPES } from "./excel.type";
import { ImportUnitsExcelUseCase } from "./use-case/import-units-excel.use-case";
import { ExportUnitsExcelUseCase } from "./use-case/export-units-excel.use-case";
import { UnitExcelController } from "./excel.controller";

export const excelModule = new ContainerModule(({bind}) => {
  bind<ImportUnitsExcelUseCase>(EXCEL_TYPES.ImportUnitsExcelUseCase).to(ImportUnitsExcelUseCase);
  bind<ExportUnitsExcelUseCase>(EXCEL_TYPES.ExportUnitsExcelUseCase).to(ExportUnitsExcelUseCase);
  bind<UnitExcelController>(EXCEL_TYPES.ExcelController).to(UnitExcelController);
}
);