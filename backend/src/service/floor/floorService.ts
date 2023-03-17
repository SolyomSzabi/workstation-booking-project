import { Floor } from 'db';
import { IFloorRepository, IWorkstationRepository } from '../../repository';
import { floorSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

type ReturnType = {
  status: string;
  message: string[];
};

type ReturnWithFloor = ReturnType & {
  floor: Floor;
};

export interface IFloorService {
  getFloors(): Promise<Floor[]>;
  createFloor(floor: Floor): Promise<ReturnType | ReturnWithFloor>;
  updateFloor(floor: Floor): Promise<ReturnType>;
  deleteFloorById(floorID: number): Promise<ReturnType>;
  getBuildingsFloors(buildingID: number): Promise<Floor[]>;
}

export class FloorService implements IFloorService {
  constructor(
    private floorRepository: IFloorRepository,
    private workstationRepository: IWorkstationRepository
  ) {}

  async getFloors(): Promise<Floor[]> {
    return await this.floorRepository.findAllFloors();
  }

  async createFloor(floor: Floor): Promise<ReturnType | ReturnWithFloor> {
    try {
      const value = await floorSchema.validateAsync(floor);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newFloor = await this.floorRepository.saveFloor(floor);
    this.workstationRepository.saveMulitpleWorkstation(newFloor);
    return {
      status: 'OK',
      message: [`Floor is succesfully saved with id: ${newFloor.floorID}`],
      floor: newFloor,
    };
  }

  async updateFloor(floor: Floor): Promise<ReturnType> {
    const updatedFloor =
      (await this.floorRepository.updateFloor(floor)) !== null;

    return {
      status: updatedFloor ? 'OK' : 'Error',
      message: updatedFloor
        ? [`Floor with: ${floor.floorID} has been updated`]
        : [`Something went wrong`],
    };
  }

  async deleteFloorById(floorID: number): Promise<ReturnType> {
    const deletedFloor: boolean =
      (await this.floorRepository.deleteFloorById(floorID)) === !null;
    return {
      status: deletedFloor ? 'OK' : 'Error',
      message: deletedFloor
        ? [`Floor succesfully deleted with id:${floorID}`]
        : [`Floor with ${floorID} not found`],
    };
  }

  async getBuildingsFloors(buildingID: number): Promise<Floor[]> {
    return this.floorRepository.getBuildingsFloors(buildingID);
  }
}
