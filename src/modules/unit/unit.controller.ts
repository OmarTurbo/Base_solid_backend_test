import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { catchAsync } from "../../utils";
import { UNIT_TYPES } from "./unit.types";
import {
    CreateUnitUseCase,
    DeleteUnitUseCase,
    GetAllUnitsUseCase,
    GetUnitByIdUseCase,
    UpdateUnitUseCase
} from "./use-cases";

@injectable()
export class UnitController {
    constructor(
        @inject(UNIT_TYPES.CreateUnitUseCase)
        private createUnitUseCase: CreateUnitUseCase,

        @inject(UNIT_TYPES.GetAllUnitsUseCase)
        private getAllUnitsUseCase: GetAllUnitsUseCase,

        @inject(UNIT_TYPES.GetUnitByIdUseCase)
        private getUnitByIdUseCase: GetUnitByIdUseCase,

        @inject(UNIT_TYPES.UpdateUnitUseCase)
        private updateUnitUseCase: UpdateUnitUseCase,

        @inject(UNIT_TYPES.DeleteUnitUseCase)
        private deleteUnitUseCase: DeleteUnitUseCase
    ) { }

    create = catchAsync(async (req: Request, res: Response) => {
        const floor = await this.createUnitUseCase.execute(req.body);
        res.status(201).json({ status: "success", floor });
    });

    findAll = catchAsync(async (req: Request, res: Response) => {
        const floors = await this.getAllUnitsUseCase.execute(req.query as Record<string, string>);
        res.status(200).json({ status: "success", floors });
    });

    findById = catchAsync(async (req: Request, res: Response) => {
        const floorId = req.params.id as string;
        const floor = await this.getUnitByIdUseCase.execute(floorId);
        res.status(200).json({ status: "success", floor });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const unit = await this.updateUnitUseCase.execute(
            req.params.id as string,
            req.body,
            req.user!.role
        );

        res.status(200).json({
            status: "success",
            unit,
        });
    });


    delete = catchAsync(async (req: Request, res: Response) => {
        const floorId = req.params.id as string;
        await this.deleteUnitUseCase.execute(floorId);
        res.status(200).json({ status: "success" });
    });
}