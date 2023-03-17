import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './users';
import { Workstation } from './workstation';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  bookingID?: number;

  @Column('datetime')
  date?: Date;

  @ManyToOne(() => Workstation, workstation => workstation.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workstation' })
  workstation?: Workstation;

  @ManyToOne(() => User, user => user.booking, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user?: User;
}
