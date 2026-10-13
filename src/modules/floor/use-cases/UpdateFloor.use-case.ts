import { inject, injectable } from "inversify";
import { FLOOR_TYPES } from "../floor.types";
import { validateFloorId } from "../helper/validateFloorId";
import { IFloorRepository } from "../../../repositories/interfaces";
import { AppError } from "../../../utils";
import { FLOOR_ERRORS } from "../errorMessage";
import { UpdateFloorInput } from "../helper/floor.schema";

@injectable()
export class UpdateFloorUseCase {
  constructor(
    @inject(FLOOR_TYPES.FloorRepository)
    private floorRepository: IFloorRepository,
  ) {}

  async execute(id: string, data: UpdateFloorInput) {
    validateFloorId(id);

    const updateData = data.floorName
      ? { ...data, floorName: data.floorName.toUpperCase() }
      : data;

    const floor = await this.floorRepository.updateById(id, updateData);
    if (!floor) {
      throw new AppError(
        FLOOR_ERRORS.NOT_FOUND.message,
        FLOOR_ERRORS.NOT_FOUND.statusCode,
      );
    }
    return floor;
  }
}
