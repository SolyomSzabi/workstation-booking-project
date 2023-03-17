import { Workstation } from 'db';
import { IWorkstationRepository } from '../../repository';
import { workstationSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface IWorkstationService {
  getWorkstations(): Promise<Workstation[]>;
  createWorkstation(
    workstation: Workstation
  ): Promise<{ status: string; message: string[] }>;
  updateWorkstation(
    workstation: Workstation
  ): Promise<{ status: string; message: string[] }>;
  deleteWorkstation(
    workstationID: number
  ): Promise<{ status: string; message: string[] }>;
  findWorkstationsOnAFloor(
    floorID: number,
    date: string
  ): Promise<Workstation[]>;
}

export class WorkstationService implements IWorkstationService {
  constructor(private workstationRepository: IWorkstationRepository) {}

  async getWorkstations(): Promise<Workstation[]> {
    return await this.workstationRepository.findAllWorkstations();
  }

  async createWorkstation(
    workstation: Workstation
  ): Promise<{ status: string; message: string[] }> {
    try {
      const value = await workstationSchema.validateAsync(workstation);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newWorkstation = await this.workstationRepository.saveWorkstation(
      workstation
    );

    return {
      status: 'OK',
      message: [
        `Workstation is succesfully saved with id: ${newWorkstation.workstationID}`,
      ],
    };
  }

  async updateWorkstation(
    workstation: Workstation
  ): Promise<{ status: string; message: string[] }> {
    const updatedWorkstation =
      (await this.workstationRepository.updateWorkstation(workstation)) !==
      null;

    return {
      status: updatedWorkstation ? 'OK' : 'Error',
      message: updatedWorkstation
        ? [`Workstation with: ${workstation.workstationID} has been updated`]
        : [`Something went wrong`],
    };
  }

  async deleteWorkstation(
    workstationID: number
  ): Promise<{ status: string; message: string[] }> {
    const deletedWorkstation: boolean =
      await this.workstationRepository.deleteWorkstation(workstationID);
    return {
      status: deletedWorkstation ? 'OK' : 'Error',
      message: deletedWorkstation
        ? [`Workstation succesfully deleted with ${workstationID}`]
        : [`Workstation with ${workstationID} not found`],
    };
  }

  async findWorkstationsOnAFloor(
    floorID: number,
    date: string
  ): Promise<Workstation[]> {
    const workstations = (
      await this.workstationRepository.findWorkstationsOnAFloor(floorID)
    ).map(workstation => {
      const bookings = workstation.bookings?.filter(booking => {
        return booking.date?.toDateString() === new Date(date).toDateString();
      });
      workstation.bookings = bookings;
      return workstation;
    });

    return workstations;
  }
}
