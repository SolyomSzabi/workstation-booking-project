import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Floor } from './floor';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn()
  buildingID?: number;

  @Column({ nullable: false, type: 'varchar' })
  name?: string;

  @Column({ nullable: false, type: 'varchar' })
  country?: string;

  @Column({ nullable: false, type: 'varchar' })
  postal_code?: string;

  @Column({ nullable: false, type: 'varchar' })
  city?: string;

  @Column({ nullable: false, type: 'varchar' })
  address?: string;

  @OneToMany(() => Floor, floor => floor.building)
  floors?: Floor[];
}
