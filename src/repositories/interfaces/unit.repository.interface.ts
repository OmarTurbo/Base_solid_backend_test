import { IUnit } from "../../interfaces"

export interface IUnitRepository{
    createUnitService(data: IUnit): Promise<IUnit>;
    getUnitsService(query: Record<string, any>): Promise<IUnit[]>;
    getUnitByIdService(id: string): Promise<IUnit | null>;
    updateUnitService(id: string, data: Partial<IUnit>, userRole: string): Promise<IUnit | null>;
    deleteUnitService(id: string, adminRole: string): Promise<boolean>;
}