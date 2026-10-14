import { IUnit } from "../../interfaces";
import { IUnitPopulated } from "../../interfaces";

export interface IUnitRepository {
    createUnit(data: Partial<IUnit>): Promise<IUnit>;
    findByUnitSegment(unitSegment: string): Promise<IUnit | null>;
    findAllUnits(query: Record<string, string>): Promise<IUnitPopulated[]>;
    findUnitById(id: string): Promise<IUnitPopulated | null>;
    updateUnitById(id: string, data: Partial<IUnit>): Promise<IUnit | null>;
    deleteUnitById(id: string): Promise<IUnit | null>;
}