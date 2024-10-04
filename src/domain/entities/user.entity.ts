import { CityRequest } from './city-request.entity';

export class User {
  constructor(
    public readonly id: number,
    public username: string,
    public password: string,
    public created_on: Date,
    public updated_on: Date,
    public cityRequests: CityRequest[] = [],
  ) {}
}
