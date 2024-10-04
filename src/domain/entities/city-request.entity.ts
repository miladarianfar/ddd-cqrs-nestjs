import { Place } from "./place.entity";

export class CityRequest {
  constructor(
    public readonly id: number,
    public readonly postCode: string,
    public readonly country: string,
    public readonly state: string,
    public readonly places: Place[],
    public readonly userId: number,
    public readonly createdOn: Date,
    public readonly updatedOn: Date,
  ) {}
}
