import { appDataSource } from '../db';
import { Floor } from '../db';

export interface IFloorRepository {
  findAllFloors(): Promise<Floor[]>;
  saveFloor(floor: Floor): Promise<Floor>;
  updateFloor(floor: Floor): Promise<Floor | null>;
  deleteFloorById(floorID: number): Promise<boolean>;
  getBuildingsFloors(buildingID: number): Promise<Floor[]>;
}

export class FloorRepository implements IFloorRepository {
  findAllFloors(): Promise<Floor[]> {
    return appDataSource.getRepository(Floor).find({
      relations: { building: true },
    });
  }

  saveFloor(floor: Floor): Promise<Floor> {
    const floorToSave = new Floor();
    floorToSave.building = floor.building;
    floorToSave.capacity = floor.capacity;
    floorToSave.floorName = floor.floorName;

    return appDataSource.getRepository(Floor).save(floorToSave);
  }

  findFloor(floor: Floor): Promise<Floor | null> {
    return appDataSource
      .getRepository(Floor)
      .findOne({ where: { floorID: floor.floorID } });
  }

  findFloorById(floorID: number): Promise<Floor | null> {
    return appDataSource
      .getRepository(Floor)
      .findOne({ where: { floorID: floorID } });
  }

  async updateFloor(floor: Floor): Promise<Floor | null> {
    if ((await this.findFloor(floor)) === null) return null;
    const updateResult = appDataSource
      .createQueryBuilder()
      .update(Floor)
      .set({
        capacity: floor.capacity,
        floorName: floor.floorName,
        building: floor.building,
      })
      .where('floorId=:id', { id: floor.floorID })
      .execute();
    const updatedFloor = this.findFloor(floor);
    return updatedFloor;
  }

  async deleteFloorById(floorID: number): Promise<boolean> {
    if ((await this.findFloorById(floorID)) === null) return false;

    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(Floor)
      .where('floorID=:id', { id: floorID })
      .execute();
    if ((await this.findFloorById(floorID)) === null) {
      return true;
    } else {
      return false;
    }
  }

  async getBuildingsFloors(buildingID: number): Promise<Floor[]> {
    return appDataSource
      .getRepository(Floor)
      .find({ where: { building: { buildingID: buildingID } } });
  }
}
