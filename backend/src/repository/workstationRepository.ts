import { appDataSource, Floor } from '../db';
import { Workstation } from '../db';

export interface IWorkstationRepository {
  findAllWorkstations(): Promise<Workstation[]>;
  findWorkstation(workstation: Workstation): Promise<Workstation | null>;
  saveWorkstation(workstation: Workstation): Promise<Workstation>;
  updateWorkstation(workstation: Workstation): Promise<Workstation | null>;
  deleteWorkstation(workstationID: number): Promise<boolean>;
  saveMulitpleWorkstation(floor: Floor): Promise<Workstation[]>;
  findWorkstationsOnAFloor(floorID: number): Promise<Workstation[]>;
}

export class WorkstationRepository implements IWorkstationRepository {
  findAllWorkstations(): Promise<Workstation[]> {
    return appDataSource
      .getRepository(Workstation)
      .find({ relations: { floor: true } });
  }

  saveWorkstation(workstation: Workstation): Promise<Workstation> {
    const workstationToSave = new Workstation();
    workstationToSave.floor = workstation.floor;

    return appDataSource.getRepository(Workstation).save(workstationToSave);
  }

  async saveMulitpleWorkstation(floor: Floor): Promise<Workstation[]> {
    const createdWorkstations: Workstation[] = [];
    for (let i = 0; i < floor.capacity!; i++) {
      const workstationToSave = new Workstation();
      workstationToSave.floor = floor;
      createdWorkstations.push(
        await appDataSource.getRepository(Workstation).save(workstationToSave)
      );
    }
    return createdWorkstations;
  }

  findWorkstation(workstation: Workstation): Promise<Workstation | null> {
    return appDataSource
      .getRepository(Workstation)
      .findOne({ where: { workstationID: workstation.workstationID } });
  }

  findWorkstationById(workstationID: number): Promise<Workstation | null> {
    return appDataSource
      .getRepository(Workstation)
      .findOne({ where: { workstationID: workstationID } });
  }

  async updateWorkstation(
    workstation: Workstation
  ): Promise<Workstation | null> {
    if ((await this.findWorkstation(workstation)) === null) return null;
    const updateResult = appDataSource
      .createQueryBuilder()
      .update(Workstation)
      .set({ floor: workstation.floor })
      .where('workstationID=:id', { id: workstation.workstationID })
      .execute();
    const updatedWorkStation = this.findWorkstation(workstation);
    return updatedWorkStation;
  }

  async deleteWorkstation(workstationID: number): Promise<boolean> {
    if ((await this.findWorkstationById(workstationID)) === null) return false;

    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(Workstation)
      .where('workstationID=:id', { id: workstationID })
      .execute();
    if ((await this.findWorkstationById(workstationID)) === null) {
      return true;
    } else {
      return false;
    }
  }

  findWorkstationsOnAFloor(floorID: number): Promise<Workstation[]> {
    return appDataSource.getRepository(Workstation).find({
      relations: { bookings: { user: true } },
      select: {
        workstationID: true,
        bookings: {
          bookingID: true,
          date: true,
          user: {
            userName: true,
          },
        },
      },
      where: {
        floor: { floorID: floorID },
      },
    });
  }
}
