import { inject, injectable } from "inversify";
import { UNIT_TYPES } from "../unit.types";
import { IUnitRepository } from "../../../repositories/interfaces";
@injectable()
export class GetAllUnitsUseCase {
    constructor(
        @inject(UNIT_TYPES.unitRepository)
        private unitRepository: IUnitRepository,
    ) { }

    async execute(query: Record<string, string>) {
        const floors = await this.unitRepository.findAllUnits(query);
        return { results: floors.length, floors };
    }
}
