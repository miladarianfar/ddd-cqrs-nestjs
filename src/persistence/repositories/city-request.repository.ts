import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityRequest } from '../typeorm/entities/city-request.entity';
import { CityRequest as DomainCityRequest } from 'src/domain/entities/city-request.entity';
import { CityRequestRepository as DomainCityRequestRepository } from 'src/domain/repositories/city-request.repository';
import { Place } from 'src/domain/entities/place.entity';

@Injectable()
export class CityRequestRepository implements DomainCityRequestRepository {
  constructor(
    @InjectRepository(CityRequest)
    private readonly cityRequestRepo: Repository<CityRequest>,
  ) {}

  async saveRequest(
    cityRequest: DomainCityRequest,
  ): Promise<DomainCityRequest> {
    const request = new CityRequest();
    request.country = cityRequest.country;
    request.places = cityRequest.places;
    request.postCode = cityRequest.postCode;
    request.user = cityRequest.user;

    const savedRequest = await this.cityRequestRepo.save(cityRequest);
    return new DomainCityRequest(
      savedRequest.id,
      savedRequest.postCode,
      savedRequest.country,
      savedRequest.places,
      savedRequest.user,
      savedRequest.created_on,
      savedRequest.updated_on,
    );
  }

  async findAllByUser(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<DomainCityRequest[]> {
    return this.cityRequestRepo.find({
      where: { user: { id: userId } },
      take: limit,
      skip: offset,
    });
  }
}
