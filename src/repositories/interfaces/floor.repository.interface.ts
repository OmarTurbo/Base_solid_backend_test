import { IFloor } from "../../interfaces";

export interface IFloorRepository {
  create(data: Partial<IFloor>): Promise<IFloor>;
  findByName(floorName: string): Promise<IFloor | null>;
  findById(id: string): Promise<IFloor | null>;
  findAll(query: Record<string, string>): Promise<IFloor[]>;
  updateById(id: string, data: Partial<IFloor>): Promise<IFloor | null>;
  deleteById(id: string): Promise<IFloor | null>;
}
