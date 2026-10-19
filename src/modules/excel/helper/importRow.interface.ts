import { FloorType, FloorStatus, TypeSegment, UnitStatus } from "../../../enums";

export interface IImportRow {
    floorName: string;
    floorType: FloorType;
    floorStatus: FloorStatus;
    unitSegment: string;
    typeSegment: TypeSegment;
    unitStatus: UnitStatus;
    totalArea: number;
    GSAArea: number;
    outdoorTerrace: number;
    mtrPrice: number;
    finalPrice: number;
    progUnitKey: string;
}