import { inject, injectable } from "inversify";
import { UNIT_TYPES } from "../unit.types";
import { validateUnitId } from "../helper/validateUnitId";
import { IUnitRepository } from "../../../repositories/interfaces";
import { AppError } from "../../../utils";
import { UNIT_ERRORS } from "../errorMessage";

@injectable()
export class GetUnitByIdUseCase {
    constructor(
        @inject(UNIT_TYPES.unitRepository)
        private unitRepository: IUnitRepository,
    ) { }

    async execute(id: string) {
        validateUnitId(id);
        const unit = await this.unitRepository.findUnitById(id);
        if (!unit) {
            throw new AppError(
                UNIT_ERRORS.NOT_FOUND.message,
                UNIT_ERRORS.NOT_FOUND.statusCode,
            );
        }
        return unit;
    }
}
