import { appDataSource } from '../db';
import { Building } from '../db';

export interface IBuildingsRepository {
  findAllBuildings(): Promise<Building[]>;
  saveBuilding(buildings: Building): Promise<Building>;
  updateBuilding(buildings: Building): Promise<Building | null>;
  deleteBuildingById(buildingID: number): Promise<boolean>;
}

export class BuildingsRepository implements IBuildingsRepository {
  async findAllBuildings(): Promise<Building[]> {
    return appDataSource.getRepository(Building).find();
  }

  saveBuilding(building: Building): Promise<Building> {
    const buildingToSave = new Building();
    buildingToSave.name = building.name;
    buildingToSave.country = building.country;
    buildingToSave.postal_code = building.postal_code;
    buildingToSave.city = building.city;
    buildingToSave.address = building.address;

    return appDataSource.getRepository(Building).save(buildingToSave);
  }

  async findBuilding(buildings: Building): Promise<Building | null> {
    return await appDataSource
      .getRepository(Building)
      .findOne({ where: { buildingID: buildings.buildingID } });
  }

  async findBuildingById(buildingID: number): Promise<Building | null> {
    return await appDataSource
      .getRepository(Building)
      .findOne({ where: { buildingID } });
  }

  async updateBuilding(building: Building): Promise<Building | null> {
    if ((await this.findBuilding(building)) === null) return null;
    const updateResult = appDataSource
      .createQueryBuilder()
      .update(Building)
      .set({
        name: building.name,
        country: building.country,
        postal_code: building.postal_code,
        city: building.city,
        address: building.address,
      })
      .where('buildingId=:id', { id: building.buildingID })
      .execute();
    const updatedBuilding = this.findBuilding(building);
    return updatedBuilding;
  }

  async deleteBuildingById(buildingID: number): Promise<boolean> {
    if ((await this.findBuildingById(buildingID)) === null) return false;

    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(Building)
      .where('buildingID = :id', { id: buildingID })
      .execute();

    if ((await this.findBuildingById(buildingID)) === null) {
      return true;
    } else {
      return false;
    }
  }
}
