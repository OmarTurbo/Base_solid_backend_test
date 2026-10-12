import { injectable } from "inversify";
import Floor from "../models/floor.model";
import { IFloor } from "../interfaces";
import { IFloorRepository } from "./interfaces/floor.repository.interface";
import { APIFeatures } from "../utils/apiFeatures";

@injectable()
export class FloorRepository implements IFloorRepository {
  async create(data: Partial<IFloor>): Promise<IFloor> {
    return Floor.create(data);
  }

  async findByName(floorName: string): Promise<IFloor | null> {
    return Floor.findOne({ floorName }).lean<IFloor | null>();
  }

  async updateById(id: string, data: Partial<IFloor>): Promise<IFloor | null> {
    return Floor.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean<IFloor | null>();
  }

  async deleteById(id: string): Promise<IFloor | null> {
    return Floor.findByIdAndDelete(id).lean<IFloor | null>();
  }
  async findAll(query: Record<string, string>): Promise<IFloor[]> {
    const features = new APIFeatures(Floor.find(), query)
      .filter()
      .search("floorName")
      .sort()
      .paginate();

    return await features.query;
  }

  async findById(id: string): Promise<IFloor | null> {
    return Floor.findById(id).lean<IFloor | null>();
  }
}
