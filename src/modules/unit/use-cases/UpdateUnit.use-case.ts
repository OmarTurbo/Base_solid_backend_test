import { inject, injectable } from "inversify";
import { UNIT_TYPES } from "../unit.types";
import { validateUnitId } from "../helper";
import {
    ADMIN_UPDATABLE_FIELDS,
    USER_UPDATABLE_FIELDS,
} from "../helper";
import { UpdateUnitInput } from "../helper";
import { IUnitRepository } from "../../../repositories/interfaces";
import { AppError } from "../../../utils";
import { UNIT_ERRORS } from "../errorMessage";
import { Role } from "../../../enums";

@injectable()
export class UpdateUnitUseCase {
    constructor(
        @inject(UNIT_TYPES.unitRepository)
        private unitRepository: IUnitRepository,
    ) { }

    async execute(id: string, data: UpdateUnitInput, role: string) {
        validateUnitId(id);

        const sentFields = Object.keys(data);
        if (!sentFields.length) {
            throw new AppError(
                UNIT_ERRORS.NO_DATA.message,
                UNIT_ERRORS.NO_DATA.statusCode,
            );
        }

        const allowedFields =
            role === Role.ADMIN_ROLE ? ADMIN_UPDATABLE_FIELDS : USER_UPDATABLE_FIELDS;

        const forbiddenFields = sentFields.filter(
            (field) => !allowedFields.includes(field),
        );
        if (forbiddenFields.length) {
            throw new AppError(
                `${UNIT_ERRORS.FORBIDDEN_FIELDS.message}: ${forbiddenFields.join(", ")}`,
                UNIT_ERRORS.FORBIDDEN_FIELDS.statusCode,
            );
        }

        // floor can never reach this point (it is in neither allowed list),
        // so removing it here only helps TypeScript with its string vs ObjectId type.
        const { floor: _floor, ...updateData } = data;

        const unit = await this.unitRepository.updateUnitById(id, updateData);
        if (!unit) {
            throw new AppError(
                UNIT_ERRORS.NOT_FOUND.message,
                UNIT_ERRORS.NOT_FOUND.statusCode,
            );
        }
        return unit;
    }
}