import { injectable, inject } from "inversify";
import ExcelJS from "exceljs";
// import unitRepository interface 

// import { IUnitRepository } from "../../../repositories/interfaces";
// import { UNIT_TYPES } from "../../units/units.types";
// import { makeExportFilePath } from "../../../utils/filePath";

@injectable()
export class ExportUnitsExcelUseCase {
  constructor(
  //  @inject(UNIT_TYPES.UnitRepository)
  //  private readonly unitRepository: IUnitRepository
  ) {}

  async execute() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Units");

    // Header row – matches the expected import sheet column order exactly
    sheet.addRow([
    // col 1  
    // col 2
    // col 3
    // col 4
    // col 5 
    // col 6
    // col 7
    // col 8
    // col 9
    // col 10
    ]);

    // Style header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9EAD3" },
      };
    });

    // steps to make the export:
    // 1. fetch units with building populated (units)
    // 2. loop over units and addRow to sheet with the exact column order as the header
    

   // fetch units with building populated (units)
    
    ///=====> note that (change this to your actual field names and relations)

    // units.forEach((u: any) => {
    //   sheet.addRow([
    //     u.building?.building,     // Building name from populated ref
    //     u.unitCode,
    //     u.lastStatus,
    //     u.buildingType,        
    //     u.totalPrice,
    //     u.category,
    //     u.design,
    //     u.floor,
    //     u.unitNumber,
    //     u.mtrPrice,
    //     u.grossArea,
    //     u.garden   ?? 0,
    //     u.roofArea ?? 0,
    //     u.numberOfRooms,
    //     u.numOfBathrooms,
    //   ]);
    // });

    // Auto-fit column widths
    sheet.columns.forEach((col) => {
      let maxLen = 10;
      col.eachCell?.({ includeEmpty: false }, (cell) => {
        const len = cell.value ? String(cell.value).length : 0;
        if (len > maxLen) maxLen = len;
      });
      col.width = maxLen + 2;
    });

   // const filePath = makeExportFilePath();
   // await workbook.xlsx.writeFile(filePath);

  //  return filePath;
  }
}
