import { injectable } from "inversify";
import { Unit } from "../models";
import { IUnit, IFloorPopulated, IUnitPopulated } from "../interfaces";
import { IUnitRepository } from "./interfaces/unit.repository.interface";
import { APIFeatures } from "../utils/apiFeatures";

const FLOOR_FIELDS = "floorName floorType floorStatus";

@injectable()
export class UnitRepository implements IUnitRepository {
    async createUnit(data: Partial<IUnit>): Promise<IUnit> {
        return Unit.create(data);
    }

    async findByUnitSegment(unitSegment: string): Promise<IUnit | null> {
        return Unit.findOne({ unitSegment }).lean<IUnit | null>();
    }

    async findAllUnits(query: Record<string, string>): Promise<IUnitPopulated[]> {
        const features = new APIFeatures(Unit.find(), query)
            .filter()
            .search("unitSegment")
            .sort()
            .paginate();

        return await features.query
            .populate<{ floor: IFloorPopulated }>("floor", FLOOR_FIELDS)
            .lean<IUnitPopulated[]>();
    }

    async findUnitById(id: string): Promise<IUnitPopulated | null> {
        return Unit.findById(id)
            .populate<{ floor: IFloorPopulated }>("floor", FLOOR_FIELDS)
            .lean<IUnitPopulated | null>();
    }

    async updateUnitById(id: string, data: Partial<IUnit>): Promise<IUnit | null> {
        return Unit.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).lean<IUnit | null>();
    }

    async deleteUnitById(id: string): Promise<IUnit | null> {
        return Unit.findByIdAndDelete(id).lean<IUnit | null>();
    }
}