import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { catchAsync } from "../../utils";
import { FLOOR_TYPES } from "./floor.types";
import {
    GetFloorByIdUseCase,
    GetAllFloorsUseCase,
    CreateFloorUseCase,
    UpdateFloorUseCase,
    DeleteFloorUseCase
} from "./use-cases";

@injectable()
export class FloorController {
    constructor(
        @inject(FLOOR_TYPES.CreateFloorUseCase)
        private createFloorUseCase: CreateFloorUseCase,

        @inject(FLOOR_TYPES.GetAllFloorsUseCase)
        private getAllFloorsUseCase: GetAllFloorsUseCase,

        @inject(FLOOR_TYPES.GetFloorByIdUseCase)
        private getFloorByIdUseCase: GetFloorByIdUseCase,

        @inject(FLOOR_TYPES.UpdateFloorUseCase)
        private updateFloorUseCase: UpdateFloorUseCase,

        @inject(FLOOR_TYPES.DeleteFloorUseCase)
        private deleteFloorUseCase: DeleteFloorUseCase
    ) { }

    create = catchAsync(async (req: Request, res: Response) => {
        const floor = await this.createFloorUseCase.execute(req.body);
        res.status(201).json({ status: "success", floor });
    });

    findAll = catchAsync(async (req: Request, res: Response) => {
        const floors = await this.getAllFloorsUseCase.execute(req.query as Record<string, string>);
        res.status(200).json({ status: "success", floors });
    });

    findById = catchAsync(async (req: Request, res: Response) => {
        const floorId = req.params.id as string;
        const floor = await this.getFloorByIdUseCase.execute(floorId);
        res.status(200).json({ status: "success", floor });
    });

    update = catchAsync(async (req: Request, res: Response) => {
        const floorId = req.params.id as string;
        const floor = await this.updateFloorUseCase.execute(
            floorId,
            req.body.update
        );
        res.status(200).json({ status: "success", floor });
    });

    delete = catchAsync(async (req: Request, res: Response) => {
        const floorId = req.params.id as string;
        await this.deleteFloorUseCase.execute(floorId);
        res.status(200).json({ status: "success" });
    });
}