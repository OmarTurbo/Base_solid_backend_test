import { injectable, inject } from "inversify";
import ExcelJS from "exceljs";
import { UNIT_TYPES } from "../../unit/unit.types";
import { IUnitRepository } from "../../../repositories/interfaces";
import { makeExportFilePath } from "../../../utils/filePath";

@injectable()
export class ExportUnitsExcelUseCase {
  constructor(
    @inject(UNIT_TYPES.unitRepository)
    private readonly unitRepository: IUnitRepository,
  ) { }

  async execute(): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Units");

    sheet.addRow([
      "floor_name", "floor_type", "floor_status", "unit_segment",
      "type_segment", "unit_status", "total_area", "GSA_area",
      "outdoor_terrace", "mtr_price", "final_price", "progUnitKey",
    ]);

    // keep the header-styling block from the skeleton here

    const units = await this.unitRepository.findAllWithFloor();
    units.forEach((u) => {
      sheet.addRow([
        u.floor?.floorName,
        u.floor?.floorType,
        u.floor?.floorStatus,
        u.unitSegment,
        u.typeSegment,
        u.unitStatus,
        u.totalArea,
        u.GSAArea,
        u.outdoorTerrace,
        u.mtrPrice,
        u.finalPrice,
        u.progUnitKey,
      ]);
    });

    // keep the "auto-fit column widths" block from the skeleton here

    const filePath = makeExportFilePath();
    await workbook.xlsx.writeFile(filePath);
    return filePath;
  }
}