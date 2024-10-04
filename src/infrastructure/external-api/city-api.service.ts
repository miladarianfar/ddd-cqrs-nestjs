// infrastructure/external-api/city-api.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class CityApiService {
  constructor(private readonly httpService: HttpService) {}

  async getCityData(postCode: string): Promise<AxiosResponse<any>> {
    const url = `https://api.zippopotam.us/us/${postCode}`;
    return this.httpService.get(url).toPromise();
  }
}
