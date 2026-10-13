import { inject, injectable } from "inversify";
import { FLOOR_TYPES } from "../floor.types";
import { validateFloorId } from "../helper/validateFloorId";
import { IFloorRepository } from "../../../repositories/interfaces";
import { AppError } from "../../../utils";
import { FLOOR_ERRORS } from "../errorMessage";

@injectable()
export class DeleteFloorUseCase {
  constructor(
    @inject(FLOOR_TYPES.FloorRepository)
    private floorRepository: IFloorRepository
  ) {}

  async execute(id: string) {
    validateFloorId(id);
    const floor = await this.floorRepository.deleteById(id);
    if (!floor) {
      throw new AppError(
        FLOOR_ERRORS.NOT_FOUND.message,
        FLOOR_ERRORS.NOT_FOUND.statusCode
      );
    
    }
    return floor;
  }
}
