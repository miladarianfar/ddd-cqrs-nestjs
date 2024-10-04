import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityRequest } from '../typeorm/entities/city-request.entity';

@Injectable()
export class CityRequestRepository {
  constructor(
    @InjectRepository(CityRequest)
    private readonly cityRequestRepo: Repository<CityRequest>,
  ) {}

  async saveRequest(cityRequest: CityRequest): Promise<CityRequest> {
    return this.cityRequestRepo.save(cityRequest);
  }

  async findAllByUser(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<CityRequest[]> {
    return this.cityRequestRepo.find({
      where: { user: { id: userId } },
      take: limit,
      skip: offset,
    });
  }
}
