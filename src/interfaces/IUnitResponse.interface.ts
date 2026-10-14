import { UnitStatus } from "../enums";

export interface IUnitResponse {
    floorName?: string;
    floorType?: string;
    floorStatus?: string;
    _id?: string | unknown;
    unitStatus: UnitStatus;
    mtrPrice: number;
    outdoorTerrace: number;
    totalArea: number;
    GSAArea: number;
    unitSegment: string;
    typeSegment: string;
    finalPrice: number | undefined;
    createdAt?: Date;
    updatedAt?: Date;
}
