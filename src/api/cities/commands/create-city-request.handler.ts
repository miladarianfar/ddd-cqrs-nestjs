import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCityRequestCommand } from './create-city-request.command';
import { UserRepository } from 'src/persistence/repositories/user.repository';
import { CityRequestRepository } from 'src/persistence/repositories/city-request.repository';
import { CityRequest } from 'src/domain/entities/city-request.entity';
import { CityApiService } from 'src/infrastructure/external-api/city-api.service';
import { Place } from 'src/domain/entities/place.entity';

@CommandHandler(CreateCityRequestCommand)
export class CreateCityRequestHandler
  implements ICommandHandler<CreateCityRequestCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cityRequestRepository: CityRequestRepository,
    private readonly cityApiService: CityApiService,
  ) {}

  async execute(command: CreateCityRequestCommand): Promise<CityRequest> {
    const user = await this.userRepository.findByUsername(command.username);
    const request = await this.cityApiService.getCityData(command.postCode);
    const cityRequest = request.data;
    console.log(cityRequest);
    const places = cityRequest.places.map((place) => {
      const obj = new Place(
        place['place name'],
        place['state'],
        place['state abbreviation'],
      );
      return obj;
    });
    const convertRequest = new CityRequest(
      0,
      cityRequest['post code'],
      cityRequest['country'],
      places,
      user,
      new Date(),
      new Date(),
    );
    console.log('convertRequest', convertRequest);
    const saveCityRequest =
      await this.cityRequestRepository.saveRequest(convertRequest);
    return saveCityRequest;
  }
}
