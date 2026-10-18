import { Types, Document } from "mongoose";
import { UnitStatus, TypeSegment } from "../enums";


export interface IUnit extends Document {
    floor: Types.ObjectId;
    unitStatus: UnitStatus;
    mtrPrice: number;
    totalArea: number;
    outdoorTerrace: number;
    GSAArea: number;
    unitSegment: string;
    typeSegment: TypeSegment;
    finalPrice?: number;
    progUnitKey: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUnitUpsert {
    floor: Types.ObjectId;
    unitSegment: string;
    typeSegment: TypeSegment;
    unitStatus: UnitStatus;
    totalArea: number;
    GSAArea: number;
    outdoorTerrace: number;
    mtrPrice: number;
    finalPrice: number;
    progUnitKey: number;
}