import mongoose, { Schema } from "mongoose";
import { IFloor } from "../interfaces";
import { FloorStatus, FloorType } from "../enums";

const floorSchema = new Schema<IFloor>(
  {
    floorName: {
      type: String,
      required: [true, "Floor name is required"],
      unique: true,
      trim: true,
    },
    floorType: {
      type: String,
      enum: Object.values(FloorType),
      required: [true, "Floor type is required"],
    },
    floorStatus: {
      type: String,
      enum: Object.values(FloorStatus),
      default: FloorStatus.AVAILABLE,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

floorSchema.virtual("units", {
  ref: "Unit",
  localField: "_id",
  foreignField: "floor",
});

export default mongoose.model<IFloor>("Floor", floorSchema);
