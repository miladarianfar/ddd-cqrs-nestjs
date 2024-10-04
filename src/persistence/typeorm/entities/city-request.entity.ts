import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CityRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postCode: string;

  @Column()
  country: string;

  @Column('json')
  places: any;

  @Column()
  state: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;
}
