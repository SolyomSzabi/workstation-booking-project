import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './bookings';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID?: number;

  @Column({ nullable: false, type: 'text' })
  email?: string;

  @Column({ nullable: false, type: 'text' })
  userName?: string;

  @Column({ nullable: false, type: 'text' })
  password?: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  active?: boolean;

  @Column({ nullable: false, type: 'boolean', default: false })
  admin?: boolean;

  @OneToMany(() => Booking, booking => booking.user)
  booking?: Booking[];
}
