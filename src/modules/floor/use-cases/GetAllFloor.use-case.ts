import { inject, injectable } from "inversify";
import { FLOOR_TYPES } from "../floor.types";
import { IFloorRepository } from "../../../repositories/interfaces";
@injectable()
export class GetAllFloorsUseCase {
  constructor(
    @inject(FLOOR_TYPES.FloorRepository)
    private floorRepository: IFloorRepository,
  ) {}

  async execute(query: Record<string, string>) {
    const floors = await this.floorRepository.findAll(query);
    return { results: floors.length, floors };
  }
}
