import { injectable } from "inversify";
import { AppError } from "../utils";
import { CheckRole } from "../utils";
import Unit from "../models/unit.model";
import { IUnit, IFloorPopulated, IUnitResponse } from "../interfaces";
import { IUnitRepository } from "./interfaces/unit.repository.interface";
import { APIFeatures } from "../utils/apiFeatures";
import { Floor } from "../models";

@injectable()
export class UnitRepository implements IUnitRepository {
    async createUnitService(data: IUnit): Promise<IUnit> {
        const existingUnit = await Unit.findOne({
            unit_segment: data.unit_segment
        });

        if (existingUnit) {
            throw new AppError("Unit already exists", 400);
        }
        const floorExists = await Floor.findById(data.floor);

        if (!floorExists) {
            throw new AppError("Floor not found", 404);
        }
        const unit = await Unit.create(data);

        return unit;
    }

    async getUnitsService(query: Record<string, any>): Promise<IUnit[]> {
        const features = new APIFeatures<IUnit>(Unit.find(), query)
            .filter()
            .search("unit_segment")
            .sort()
            .paginate();
        const units = await features.query;
        return units;
    }

    async getUnitByIdService(id: string): Promise<IUnit | null> {
        const unitExist = await Unit.findById(id)
            .populate<{ floor: IFloorPopulated }>(
                "floor",
                "floor_name floor_type floor_status"
            );

        if (!unitExist) throw new AppError("Unit not found", 404);



        return unitExist as unknown as IUnit;
    }

    async updateUnitService(id: string, data: Partial<IUnit>, userRole: string): Promise<IUnit | null> {
        if (!Object.keys(data).length) {
            throw new AppError("No data provided for update", 400);
        }

        const ADMIN_FIELDS = ["mtr_price", "final_price", "type_segment", "unit_status", "outdoor_terrace", "total_area", "GSA_area"];
        const USER_FIELDS = ["unit_status"];

        const allowedFields =
            userRole === "admin" ? ADMIN_FIELDS : USER_FIELDS;

        const invalidFields = Object.keys(data).filter(
            (key) => !allowedFields.includes(key)
        );

        if (invalidFields.length) {
            throw new AppError(
                `You cannot update the following fields: ${invalidFields.join(", ")}`,
                403
            );
        }

        if (
            userRole !== "admin" &&
            ("mtr_price" in data || "final_price" in data)
        ) {
            throw new AppError("You do not have permission to update prices", 403);
        }

        const updatedUnit = await Unit.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!updatedUnit) {
            throw new AppError("Unit not found", 404);
        }

        return updatedUnit;
    }

    async deleteUnitService(id: string, adminRole: string): Promise<boolean> {
        CheckRole(adminRole);
        const unit = await Unit.findByIdAndDelete(id);
        if (!unit) throw new AppError("Unit not Found!", 404);
        return true;
    }
}