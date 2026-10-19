import ExcelJS from "exceljs";
import { FloorType, FloorStatus, TypeSegment, UnitStatus } from "../../../enums";
import { getCellText } from "./getCellText-helper";
import { getCellNumber } from "./getCellNumber-helper";
import { IImportRow } from "./importRow.interface";

export type ParseResult = { row: IImportRow } | { reason: string };

// matchEnum goes here (from Step 2)
function matchEnum<T extends string>(
    enumObject: Record<string, T>,
    value: string,
): T | undefined {
    return Object.values(enumObject).find(
        (v) => v.toLowerCase() === value.toLowerCase(),
    );
}

export function parseImportRow(row: ExcelJS.Row): ParseResult {
    const floorName = getCellText(row.getCell(1));
    const rawFloorType = getCellText(row.getCell(2));
    const rawFloorStatus = getCellText(row.getCell(3));
    const unitSegment = getCellText(row.getCell(4));
    const rawTypeSegment = getCellText(row.getCell(5));
    const rawUnitStatus = getCellText(row.getCell(6));

    if (!floorName) return { reason: "Missing floorName" };
    if (!unitSegment) return { reason: "Missing unitSegment" };

    const floorType = matchEnum(FloorType, rawFloorType);
    if (!floorType) return { reason: `Invalid floorType "${rawFloorType}"` };

    const floorStatus = rawFloorStatus
        ? matchEnum(FloorStatus, rawFloorStatus)
        : FloorStatus.AVAILABLE;
    if (!floorStatus) return { reason: `Invalid floorStatus "${rawFloorStatus}"` };

    const typeSegment = matchEnum(TypeSegment, rawTypeSegment);
    if (!typeSegment) return { reason: `Invalid typeSegment "${rawTypeSegment}"` };

    const unitStatus = rawUnitStatus
        ? matchEnum(UnitStatus, rawUnitStatus)
        : UnitStatus.AVAILABLE;
    if (!unitStatus) return { reason: `Invalid unitStatus "${rawUnitStatus}"` };

    const progUnitKey = getCellText(row.getCell(12));
    if (!progUnitKey ) {
        return { reason: "progUnitKey is required" };
    }

    return {
        row: {
            floorName,
            floorType,
            floorStatus,
            unitSegment,
            typeSegment,
            unitStatus,
            totalArea: getCellNumber(row.getCell(7)),
            GSAArea: getCellNumber(row.getCell(8)),
            outdoorTerrace: getCellNumber(row.getCell(9)),
            mtrPrice: getCellNumber(row.getCell(10)),
            finalPrice: getCellNumber(row.getCell(11)),
            progUnitKey,
        },
    };
}