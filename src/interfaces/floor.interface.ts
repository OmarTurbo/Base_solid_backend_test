import { FloorStatus, FloorType } from "../enums";
import { Document, Types } from "mongoose";

export interface IFloor extends Document {
  _id: Types.ObjectId;
  floorName: string;
  floorType: FloorType;
  floorStatus: FloorStatus;
  createdAt: Date;
  updatedAt: Date;
}
export interface IFloorUpsert{
  floorName: string;
  floorType: FloorType;
  floorStatus: FloorStatus;
}