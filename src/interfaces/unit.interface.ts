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