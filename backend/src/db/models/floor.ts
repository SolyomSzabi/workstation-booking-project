import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Building } from './buildings';
import { Workstation } from './workstation';

@Entity()
export class Floor {
  @PrimaryGeneratedColumn()
  floorID?: number;

  @ManyToOne(() => Building, building => building.floors, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'building' })
  building?: Building;

  @Column({ nullable: false, type: 'int' })
  capacity?: number;

  @Column({ nullable: false, type: 'text' })
  floorName?: string;

  @OneToMany(() => Workstation, workstation => workstation.floor)
  workstations?: Workstation[];
}

/*

{
  "bookingID": 36,
  "date": "2022-10-25T22:00:00.000Z",
  "workstation": {
      "workstationID": 389,
      "floor": {
          "floorID": 21,
          "capacity": 20,
          "floorName": "Tipszmiksz",
          "building": {
              "buildingID": 48,
              "name": "Sukakami",
              "country": "Kongó",
              "postal_code": "52245852",
              "city": "Hubabibi",
              "address": "Janak str 69."
          }
      }
  }
}
*/