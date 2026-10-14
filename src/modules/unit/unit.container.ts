import { ContainerModule } from "inversify";
import { UNIT_TYPES } from "./unit.types";
import { UnitController } from "./unit.controller";
import {
    CreateUnitUseCase,
    DeleteUnitUseCase,
    GetAllUnitsUseCase,
    GetUnitByIdUseCase,
    UpdateUnitUseCase
} from "./use-cases";
import { IUnitRepository } from "../../repositories/interfaces";
import { UnitRepository } from "../../repositories/unit.repository";


export const unitModule = new ContainerModule(({ bind }) => {
    bind<CreateUnitUseCase>(UNIT_TYPES.CreateUnitUseCase).to(CreateUnitUseCase);
    bind<GetUnitByIdUseCase>(UNIT_TYPES.GetUnitByIdUseCase).to(GetUnitByIdUseCase);
    bind<GetAllUnitsUseCase>(UNIT_TYPES.GetAllUnitsUseCase).to(GetAllUnitsUseCase);
    bind<UpdateUnitUseCase>(UNIT_TYPES.UpdateUnitUseCase).to(UpdateUnitUseCase);
    bind<DeleteUnitUseCase>(UNIT_TYPES.DeleteUnitUseCase).to(DeleteUnitUseCase);
    bind<IUnitRepository>(UNIT_TYPES.unitRepository).to(UnitRepository);
    bind<UnitController>(UNIT_TYPES.unitController).to(UnitController);
});