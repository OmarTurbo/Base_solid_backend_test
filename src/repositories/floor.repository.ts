import { injectable } from "inversify";
import Floor from "../models/floor.model";
import { IFloor, IFloorUpsert } from "../interfaces";
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

  async bulkUpsertFloors(floors: IFloorUpsert[]): Promise<void> {
    if (!floors.length) return;

    const operations = floors.map((floor) => ({
      updateOne: {
        filter: { floorName: floor.floorName },
        update: {
          $set: { floorType: floor.floorType, floorStatus: floor.floorStatus },
        },
        upsert: true,
      },
    }));

    await Floor.bulkWrite(operations);
  }

  async findByNames(names: string[]): Promise<IFloor[]> {
    return Floor.find({ floorName: { $in: names } }).lean<IFloor[]>();
  }
}
