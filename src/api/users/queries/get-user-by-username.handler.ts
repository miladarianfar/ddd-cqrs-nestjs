import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from './get-user-by-username.query';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/persistence/repositories/user.repository';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler
  implements IQueryHandler<GetUserByUsernameQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByUsernameQuery): Promise<User | null> {
    return this.userRepository.findByUsername(query.username);
  }
}
