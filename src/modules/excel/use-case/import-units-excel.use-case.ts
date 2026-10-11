import { injectable, inject } from "inversify";
import fs from "fs";
import ExcelJS from "exceljs";
import { getCellNumber, getCellText } from "../helper";

@injectable()
export class ImportUnitsExcelUseCase {
  constructor(
    // @inject(UNIT_TYPES.UnitRepository)
    // private readonly unitRepository: IUnitRepository,

    // @inject(BUILDING_TYPES.BuildingRepository)
    // private readonly buildingRepository: IBuildingRepository
  ) {}

  async execute(filePath: string) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.worksheets[0];

  //  const rows: ImportUnitRow[] = [];
  const skipped: { row: number; reason: string }[] = [];

  // ==> note that the code below is just an example of how you can parse and validate the Excel rows.
  //   sheet.eachRow((row, index) => {
  //     if (index === 1) return; // skip header

    
  //     const building = getCellText(row.getCell(2));
  //     const unitCode  = getCellText(row.getCell(3));

  //     if (!building || !unitCode) {
  //       skipped.push({ row: index, reason: "Missing building or unitCode" });
  //       return;
  //     }

  //     const rawStatus   = getCellText(row.getCell(4));
  //     const rawCategory = getCellText(row.getCell(7));
  //     const rawFloor    = getCellText(row.getCell(9));

      // const lastStatus = Object.values(UnitStatusEnum).find((v) => v === rawStatus);
      // const category   = Object.values(UnitCategoryEnum).find((v) => v === rawCategory);
      // const floor      = Object.values(FloorEnum).find((v) => v === rawFloor);

      // if (!lastStatus || !category || !floor) {
      //   skipped.push({
      //     row: index,
      //     reason: `Invalid enum — status:"${rawStatus}" category:"${rawCategory}" floor:"${rawFloor}"`,
      //   });
      //   return;
      // }

    //   rows.push({
    //     building,
    //     unitCode,
    //     lastStatus,
    //     buildingType:   getCellText(row.getCell(5)),
    //     totalPrice:     getCellNumber(row.getCell(6)),
    //     category,
    //     design:         getCellText(row.getCell(8)),
    //     floor,
    //     unitNumber:     getCellText(row.getCell(10)),
    //     mtrPrice:       getCellNumber(row.getCell(11)),
    //     grossArea:      getCellNumber(row.getCell(12)),
    //     garden:         getCellNumber(row.getCell(13)),
    //     roofArea:       getCellNumber(row.getCell(14)),
    //     numberOfRooms:  getCellNumber(row.getCell(15)),
    //     numOfBathrooms: getCellNumber(row.getCell(16)),
    //   });
    // });

   ///==> note that the above code is just an example of how you can parse and validate the Excel rows.
    
   // Upsert all unique buildings that appear in the sheet
  // const uniqueBuildings = [
   //   ...new Map(rows.map((r) => [r.building, { building: r.building }])).values(),
  //  ];
   // await this.buildingRepository.bulkUpsertBuildings(uniqueBuildings);

    // Resolve building name -> ObjectId
   // const allBuildings = await this.buildingRepository.findAllLean();
  //  const buildingMap  = new Map(allBuildings.map((b: any) => [b.building, b._id]));

    // Build bulk-upsert operations (keyed by unitCode)
    // const unitOps = rows.map((r) => ({
    //   updateOne: {
    //     filter: { unitCode: r.unitCode },
    //     update: {
    //       $set: {
    //         building:       buildingMap.get(r.building),
    //         unitCode:       r.unitCode,
    //         unitNumber:     r.unitNumber,
    //         buildingType:   r.buildingType,
    //         category:       r.category,
    //         design:         r.design,
    //         floor:          r.floor,
    //         lastStatus:     r.lastStatus,
    //         mtrPrice:       r.mtrPrice,
    //         totalPrice:     r.totalPrice,
    //         grossArea:      r.grossArea,
    //         garden:         r.garden,
    //         roofArea:       r.roofArea,
    //         numberOfRooms:  r.numberOfRooms,
    //         numOfBathrooms: r.numOfBathrooms,
    //       },
    //     },
    //     upsert: true,
    //   },
    // }));

   // await this.unitRepository.bulkUpsertUnits(unitOps);

    // Delete the uploaded temp file
  //   fs.unlinkSync(filePath);

    // return {
    //   success:     true,
    //   totalRows:   rows.length,
    //   skippedRows: skipped.length,
    //   skipped,
    // };
  // }
}
}