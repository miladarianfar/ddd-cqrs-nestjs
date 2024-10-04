import { Module } from '@nestjs/common';
import { UserController } from './users/controllers/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { PersistenceModule } from '../persistence/persistence.module';
import { CreateUserHandler } from './users/commands/create-user.handler';
import { GetUserByUsernameHandler } from './users/queries/get-user-by-username.handler';

const commandHandlers = [CreateUserHandler, GetUserByUsernameHandler];

@Module({
  imports: [CqrsModule, InfrastructureModule, PersistenceModule],
  providers: [
    ...commandHandlers,
  ],
  controllers: [UserController],
})
export class ApiModule {}
