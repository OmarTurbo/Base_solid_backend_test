import { inject, injectable } from "inversify";
import { FLOOR_TYPES } from "../floor.types";
import { IFloorRepository } from "../../../repositories/interfaces";
import { AppError } from "../../../utils";
import { FLOOR_ERRORS } from "../errorMessage";
import { CreateFloorInput } from "../helper/floor.schema";

@injectable()
export class CreateFloorUseCase {
  constructor(
    @inject(FLOOR_TYPES.FloorRepository)
    private floorRepository: IFloorRepository,
  ) {}

  async execute(data: CreateFloorInput) {
    const floorName = data.floorName.toUpperCase();

    const existing = await this.floorRepository.findByName(floorName);
    if (existing) {
      throw new AppError(
        FLOOR_ERRORS.ALREADY_EXISTS.message,
        FLOOR_ERRORS.ALREADY_EXISTS.statusCode,
      );
    }

    return this.floorRepository.create({ ...data, floorName });
  }
}
