import { inject, injectable } from "inversify";
import { Types } from "mongoose";
import { UNIT_TYPES } from "../unit.types";
import { FLOOR_TYPES } from "../../floor/floor.types";
import { IUnitRepository, IFloorRepository } from "../../../repositories/interfaces";
import { AppError } from "../../../utils";
import { UNIT_ERRORS } from "../errorMessage";
import { CreateUnitInput } from "../helper";

@injectable()
export class CreateUnitUseCase {
    constructor(
        @inject(UNIT_TYPES.unitRepository)
        private unitRepository: IUnitRepository,

        @inject(FLOOR_TYPES.FloorRepository)
        private floorRepository: IFloorRepository,
    ) { }

    async execute(data: CreateUnitInput) {
        const existing = await this.unitRepository.findByUnitSegment(data.unitSegment);
        if (existing) {
            throw new AppError(
                UNIT_ERRORS.ALREADY_EXISTS.message,
                UNIT_ERRORS.ALREADY_EXISTS.statusCode,
            );
        }

        const floor = await this.floorRepository.findById(data.floor);
        if (!floor) {
            throw new AppError(
                UNIT_ERRORS.FLOOR_NOT_FOUND.message,
                UNIT_ERRORS.FLOOR_NOT_FOUND.statusCode,
            );
        }

        return this.unitRepository.createUnit({
            ...data,
            floor: new Types.ObjectId(data.floor),
        });
    }
}