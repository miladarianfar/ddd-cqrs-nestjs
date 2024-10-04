import { CityRequest } from '../entities/city-request.entity';

export interface CityRequestRepository {
  saveRequest(cityRequest: CityRequest): Promise<CityRequest>;
  findAllByUser(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<CityRequest[]>;
}
