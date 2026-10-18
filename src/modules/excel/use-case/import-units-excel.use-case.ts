import { injectable, inject } from "inversify";
import fs from "fs";
import ExcelJS from "exceljs";
import { UNIT_TYPES } from "../../unit/unit.types";
import { FLOOR_TYPES } from "../../floor/floor.types";
import {
  IUnitRepository,
  IFloorRepository,
} from "../../../repositories/interfaces";
import { IFloorUpsert, IUnitUpsert } from "../../../interfaces";
import { AppError } from "../../../utils";
import { parseImportRow, IImportRow } from "../helper";
import { EXCEL_ERROR } from "../error.message";

const MAX_ROWS = 2000;

@injectable()
export class ImportUnitsExcelUseCase {
  constructor(
    @inject(UNIT_TYPES.unitRepository)
    private readonly unitRepository: IUnitRepository,

    @inject(FLOOR_TYPES.FloorRepository)
    private readonly floorRepository: IFloorRepository,
  ) { }

  async execute(filePath: string) {
    try {
      // 1. Read the file
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      const sheet = workbook.worksheets[0];

      if (!sheet) {
        throw new AppError(
          EXCEL_ERROR.EMPTY_FILE.message,
          EXCEL_ERROR.EMPTY_FILE.statusCode,
        );
      }

      // 2. Turn every row into a clean object, or a reason to skip it
      const rows: IImportRow[] = [];
      const skipped: { row: number; reason: string }[] = [];

      sheet.eachRow((excelRow, index) => {
        if (index === 1) return; // header row

        const result = parseImportRow(excelRow);
        if ("reason" in result) {
          skipped.push({ row: index, reason: result.reason });
          return;
        }
        rows.push(result.row);
      });

      if (rows.length + skipped.length > MAX_ROWS) {
        throw new AppError(
          EXCEL_ERROR.TOO_MANY_ROWS.message,
          EXCEL_ERROR.TOO_MANY_ROWS.statusCode,
        );
      }

      // 3. Save the floors first (one entry per floor name, first row wins)
      const floorsByName = new Map<string, IFloorUpsert>();
      for (const r of rows) {
        if (!floorsByName.has(r.floorName)) {
          floorsByName.set(r.floorName, {
            floorName: r.floorName,
            floorType: r.floorType,
            floorStatus: r.floorStatus,
          });
        }
      }
      await this.floorRepository.bulkUpsertFloors([...floorsByName.values()]);

      // 4. Look the floors up again to learn their ids
      const savedFloors = await this.floorRepository.findByNames([
        ...floorsByName.keys(),
      ]);
      const floorIdByName = new Map(savedFloors.map((f) => [f.floorName, f._id]));

      // 5. Save the units, each with its floor id
      const unitsToSave: IUnitUpsert[] = [];
      for (const r of rows) {
        const floorId = floorIdByName.get(r.floorName);
        if (!floorId) continue; // cannot happen: every floor was saved above

        unitsToSave.push({
          floor: floorId,
          unitSegment: r.unitSegment,
          typeSegment: r.typeSegment,
          unitStatus: r.unitStatus,
          totalArea: r.totalArea,
          GSAArea: r.GSAArea,
          outdoorTerrace: r.outdoorTerrace,
          mtrPrice: r.mtrPrice,
          finalPrice: r.finalPrice,
          progUnitKey: r.progUnitKey,
        });
      }
      await this.unitRepository.bulkUpsertUnits(unitsToSave);

      return {
        success: true,
        rowsProcessed: unitsToSave.length,
        skippedRows: skipped.length,
        skipped,
      };
    } finally {
      // 6. Always delete the uploaded file, even if something above threw
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Error deleting file: ${err}`);
      });
    }
  }
}