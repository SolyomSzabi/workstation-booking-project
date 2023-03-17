import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Floor } from './floor';
import { Booking } from './bookings';

@Entity('workstations')
export class Workstation {
  @PrimaryGeneratedColumn()
  workstationID?: number;

  @ManyToOne(() => Floor, floor => floor.workstations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'floor' })
  floor?: Floor;

  @OneToMany(() => Booking, booking => booking.workstation)
  bookings?: Booking[];
}
