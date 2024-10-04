import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/persistence/repositories/user.repository';
import { GetMyRequestsQuery } from './get-my-requests.query';
import { CityRequestRepository } from 'src/persistence/repositories/city-request.repository';
import { CityRequest } from 'src/domain/entities/city-request.entity';

@QueryHandler(GetMyRequestsQuery)
export class GetMyRequestsHandler implements IQueryHandler<GetMyRequestsQuery> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cityRequestRepository: CityRequestRepository,
  ) {}

  async execute(query: GetMyRequestsQuery): Promise<CityRequest[]> {
    const user = await this.userRepository.findByUsername(query.username);
    const requests = await this.cityRequestRepository.findAllByUser(
      user.id,
      query.limit,
      query.offset,
    );

    return requests;
  }
}
