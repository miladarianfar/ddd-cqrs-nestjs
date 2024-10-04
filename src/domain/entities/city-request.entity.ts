import { Place } from './place.entity';
import { User } from './user.entity';

export class CityRequest {
  constructor(
    public readonly id: number,
    public readonly postCode: string,
    public readonly country: string,
    public readonly state: string,
    public readonly places: Place[] = [],
    public readonly user: User,
    public readonly created_on: Date,
    public readonly updated_on: Date,
  ) {}
}
