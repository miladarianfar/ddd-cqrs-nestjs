import { Place } from 'src/domain/entities/place.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CityRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postCode: string;

  @Column()
  country: string;

  @Column('json')
  places: Place;

  @Column()
  state: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  @ManyToOne(() => User, user => user.cityRequests)
  user: User;
}
