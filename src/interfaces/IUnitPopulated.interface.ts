import { IUnit } from "./unit.interface";
import { IFloorPopulated } from "./IFloorPopulated.interface";

export type IUnitPopulated = Omit<IUnit, "floor"> & { floor: IFloorPopulated };