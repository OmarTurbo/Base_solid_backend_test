import mongoose, { Schema } from "mongoose";
import { IUnit } from "../interfaces";
import { UnitStatus, TypeSegment } from "../enums";

const unitSchema = new Schema<IUnit>(
    {
        floor: {
            type: Schema.Types.ObjectId,
            ref: "Floor",
            required: true,
        },
        unitStatus: {
            type: String,
            enum: Object.values(UnitStatus),
            default: UnitStatus.AVAILABLE,
        },

        mtrPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        outdoorTerrace: {
            type: Number,
            required: true,
            default: 0,
        },

        totalArea: {
            type: Number,
            required: true,
        },
        GSAArea: {
            type: Number,
            required: true,
        },

        unitSegment: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        typeSegment: {
            type: String,
            enum: Object.values(TypeSegment),
            required: true,
        },
        finalPrice: {
            type: Number,
            required: true,
        },
        progUnitKey: {
            type: Number,
            unique: true,
            index: true,
            required: false,
        },
    },
    { timestamps: true }
);

unitSchema.pre("save", async function () {
    if (!this.isNew || this.progUnitKey) {
        return;
    }

    const lastUnit = await mongoose
        .model("Unit")
        .findOne({}, { progUnitKey: 1 })
        .sort({ progUnitKey: -1 });

    this.progUnitKey = lastUnit?.progUnitKey
        ? lastUnit.progUnitKey + 1
        : 1;
});

export default mongoose.model<IUnit>("Unit", unitSchema);