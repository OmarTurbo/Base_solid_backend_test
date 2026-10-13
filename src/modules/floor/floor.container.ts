import { ContainerModule } from "inversify";
import { FLOOR_TYPES } from "./floor.types";
import { FloorController } from "./floor.controller";
import {
    GetFloorByIdUseCase,
    GetAllFloorsUseCase,
    CreateFloorUseCase,
    UpdateFloorUseCase,
    DeleteFloorUseCase
} from "./use-cases";
import { IFloorRepository } from "../../repositories/interfaces";
import { FloorRepository } from "../../repositories/floor.repository";


export const floorModule = new ContainerModule(({ bind }) => {
    bind<IFloorRepository>(FLOOR_TYPES.FloorRepository).to(FloorRepository);

    bind<CreateFloorUseCase>(FLOOR_TYPES.CreateFloorUseCase).to(CreateFloorUseCase);
    bind<GetFloorByIdUseCase>(FLOOR_TYPES.GetFloorByIdUseCase).to(GetFloorByIdUseCase);
    bind<GetAllFloorsUseCase>(FLOOR_TYPES.GetAllFloorsUseCase).to(GetAllFloorsUseCase);
    bind<UpdateFloorUseCase>(FLOOR_TYPES.UpdateFloorUseCase).to(UpdateFloorUseCase);
    bind<DeleteFloorUseCase>(FLOOR_TYPES.DeleteFloorUseCase).to(DeleteFloorUseCase);

    bind<FloorController>(FLOOR_TYPES.FloorController).to(FloorController);
});