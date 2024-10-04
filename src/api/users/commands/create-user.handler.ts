import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { EncryptionService } from '../../../infrastructure/encryption/encryption.service';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/persistence/repositories/user.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const encryptedPassword = await this.encryptionService.encryptPassword(
      command.password,
    );
    const user = new User(
      0,
      command.username,
      encryptedPassword,
      new Date(),
      new Date(),
      [],
    );
    return this.userRepository.createUser(user);
  }
}
