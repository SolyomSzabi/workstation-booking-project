import { Building } from '../../db';
import { IBuildingsRepository } from '../../repository';
import { buildingsSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

type ReturnType = {
  status: string;
  message: string[];
};

type ReturnWithBuilding = ReturnType & {
  building: Building;
};

export interface IBuildingsService {
  getBuildings(): Promise<Building[]>;
  createBuilding(buildings: Building): Promise<ReturnType | ReturnWithBuilding>;
  updateBuilding(
    buildings: Building
  ): Promise<{ status: string; message: string[] }>;
  deleteBuildingById(
    buildingID: number
  ): Promise<{ status: string; message: string[] }>;
}

type cityWithBuildings = {
  city: string;
  buildings: Building[];
};

export class BuildingsService implements IBuildingsService {
  constructor(private buildingsRepository: IBuildingsRepository) {}

  async getBuildings(): Promise<cityWithBuildings[]> {
    const buildings = await this.buildingsRepository.findAllBuildings();
    const cityWithBuildings: cityWithBuildings[] = [];

    buildings.forEach(building => {
      const city = building.city;
      if (city) {
        const cityIndex = cityWithBuildings.findIndex(
          cityWithBuilding => cityWithBuilding.city === city
        );
        if (cityIndex === -1) {
          cityWithBuildings.push({ city: city, buildings: [building] });
        } else {
          cityWithBuildings[cityIndex].buildings.push(building);
        }
      }
    });

    return cityWithBuildings;
  }

  async createBuilding(
    buildings: Building
  ): Promise<ReturnType | ReturnWithBuilding> {
    try {
      const value = await buildingsSchema.validateAsync(buildings);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newBuilding = await this.buildingsRepository.saveBuilding(buildings);

    return {
      status: 'OK',
      message: [
        `Building is succesfully saved with buildingID: ${newBuilding.buildingID}`,
      ],
      building: newBuilding,
    };
  }

  async updateBuilding(
    buildings: Building
  ): Promise<{ status: string; message: string[] }> {
    const updatedBuilding: boolean =
      (await this.buildingsRepository.updateBuilding(buildings)) !== null;
    return {
      status: updatedBuilding ? 'OK' : 'Error',
      message: updatedBuilding
        ? [`Building with ID ${buildings.buildingID} has been updated!`]
        : ['Something went wrong!'],
    };
  }

  async deleteBuildingById(
    buildingID: number
  ): Promise<{ status: string; message: string[] }> {
    const deleteBuilding: boolean =
      (await this.buildingsRepository.deleteBuildingById(buildingID)) === !null;
    return {
      status: deleteBuilding ? 'OK' : 'Error',
      message: deleteBuilding
        ? [`Building succesfully deleted with ID ${buildingID}!`]
        : [`Building with ID ${buildingID} not found!`],
    };
  }
}
