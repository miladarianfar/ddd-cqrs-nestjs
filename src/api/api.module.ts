import { Module } from '@nestjs/common';
import { UserController } from './users/controllers/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { PersistenceModule } from '../persistence/persistence.module';
import { CreateUserHandler } from './users/commands/create-user.handler';
import { GetUserByUsernameHandler } from './users/queries/get-user-by-username.handler';
import { CreateCityRequestHandler } from './cities/commands/create-city-request.handler';
import { CityRequestController } from './cities/controllers/city-request.controller';
import { GetMyRequestsHandler } from './cities/queries/get-my-requests.handler';

const commandHandlers = [
  CreateUserHandler,
  GetUserByUsernameHandler,
  CreateCityRequestHandler,
  GetMyRequestsHandler,
];

@Module({
  imports: [CqrsModule, InfrastructureModule, PersistenceModule],
  providers: [...commandHandlers],
  controllers: [UserController, CityRequestController],
})
export class ApiModule {}
